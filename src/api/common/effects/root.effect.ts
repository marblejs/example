import { EffectFactory } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';

export const root$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(req$ => req$.pipe(
    mapTo({ body: `API version: v1` }),
  ));