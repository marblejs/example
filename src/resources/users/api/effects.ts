import { HttpError, HttpStatus, HttpEffect } from '@marblejs/core';
import { throwError } from 'rxjs';
import { map, mergeMap, flatMap, catchError } from 'rxjs/operators';
import { neverNullable } from '../../../util/etc/rxjs';
import { UsersMethods } from './methods';

export const getMeEffect$: HttpEffect = req$ =>
  req$.pipe(
    map(req => req.user._id),
    mergeMap(UsersMethods.findById),
    mergeMap(neverNullable),
    map(user => ({ body: user })),
    catchError(() => throwError(
      new HttpError('User does not exist', HttpStatus.NOT_FOUND)
    ))
  );

export const getUserListEffect$: HttpEffect = req$ =>
  req$.pipe(
    flatMap(UsersMethods.findAllPublic),
    map(body => ({ body })),
  );
