import { HttpError, HttpStatus, HttpEffect } from '@marblejs/core';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const notFoundEffect$: HttpEffect = req$ =>
  req$.pipe(switchMap(() =>
    throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
  ));
