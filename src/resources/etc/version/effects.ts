import { HttpEffect } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';

export const versionEffect$: HttpEffect = req$ =>
  req$.pipe(
    mapTo({ body: `API version: v1` }),
  );
