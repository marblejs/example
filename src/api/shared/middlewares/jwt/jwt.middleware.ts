import * as jwt from 'jsonwebtoken';
import { Observable, throwError } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';
import { internal, HttpError, HttpStatus } from '@marblejs/core';
import { Config } from '../../../../config';
import { Middleware, HttpRequest } from '@marblejs/core';
import { map } from 'rxjs/operators';

const { Maybe } = internal;

const splitAuthorizationHeader = (header: string) =>
  header.split(' ');

const getLastSafe = <T>(array: T[]) =>
  Maybe.of(array.length)
    .map(() => array[array.length - 1]);

export const parseAuthorizationHeader = (req: HttpRequest) =>
  Maybe.of(req.headers.authorization)
    .map(splitAuthorizationHeader)
    .flatMap(getLastSafe)
    .valueOr('');

export const verifyToken$ = (secret = '') => <T extends object>(token: string) =>
  new Observable<T>(subscriber => {
    jwt.verify(token, Config.jwt.secret, (error, payload) => {
      if (error) {
        subscriber.error(error);
      } else {
        subscriber.next(payload as T);
      }

      subscriber.complete();
    });
  });

type AuthorizeMiddlewareConfig = Partial<{
  secret: string;
}>;

export const authorize$ = (config: AuthorizeMiddlewareConfig = {}): Middleware => req$ =>
  req$.pipe(
    map(parseAuthorizationHeader),
    flatMap(verifyToken$(config.secret)),
    flatMap(() => req$),
    catchError(() =>
      throwError(new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED))
    )
  );
