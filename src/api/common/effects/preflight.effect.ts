import { Effect, HttpStatus } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';

export const preflightEffect$: Effect = req$ =>
  req$.pipe(
    mapTo({ status: HttpStatus.OK }),
  );
