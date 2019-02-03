import { HttpStatus, HttpEffect } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';

export const preflightEffect$: HttpEffect = req$ =>
  req$.pipe(
    mapTo({ status: HttpStatus.OK }),
  );
