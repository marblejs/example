import { HttpError, HttpStatus, HttpEffect } from '@marblejs/core';
import { throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsersDao } from '../model/users.dao';
import { neverNullable } from '../../../util';

export const getMeEffect$: HttpEffect = req$ =>
  req$.pipe(
    map(req => req.user._id),
    mergeMap(UsersDao.findById),
    mergeMap(neverNullable),
    map(user => ({ body: user })),
    catchError(() => throwError(
      new HttpError('User does not exist', HttpStatus.NOT_FOUND)
    ))
  );
