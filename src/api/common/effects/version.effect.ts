import { Effect } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';

export const versionEffect$: Effect = req$ =>
  req$.pipe(
    mapTo({ body: `API version: v1` }),
  );
