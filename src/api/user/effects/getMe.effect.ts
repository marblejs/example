import { Effect, HttpError, HttpStatus } from '@marblejs/core';
import { throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserDao } from '../model/user.dao';
import { neverNullable } from '../../../util';

export const getMeEffect$: Effect = req$ =>
  req$.pipe(
    map(req => req.user._id),
    mergeMap(UserDao.findById),
    mergeMap(neverNullable),
    map(user => ({ body: user })),
    catchError(() => throwError(
      new HttpError('User does not exist', HttpStatus.NOT_FOUND)
    ))
  );
