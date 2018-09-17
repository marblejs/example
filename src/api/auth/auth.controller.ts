import { EffectFactory, combineRoutes, use } from '@marblejs/core';
import { map, switchMap } from 'rxjs/operators';
import { loginValidator$ } from './auth.validator';
import { authenticate$ } from './authenticator';

const login$ = EffectFactory
  .matchPath('/login')
  .matchType('POST')
  .use(req$ => req$.pipe(
    use(loginValidator$),
    switchMap(authenticate$),
    map(user => ({ body: user })),
  ));

export const auth$ = combineRoutes('/auth', [ login$ ]);
