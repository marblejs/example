import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core';

export const notFoundEffect$: HttpEffect = req$ =>
  req$.pipe(switchMap(() =>
    throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
  ));
