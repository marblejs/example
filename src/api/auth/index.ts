import { combineRoutes, EffectFactory } from '@marblejs/core';
import { loginEffect$ } from './effects/login.effect';

const login$ = EffectFactory
  .matchPath('/login')
  .matchType('POST')
  .use(loginEffect$);

export const auth$ = combineRoutes('/auth', [login$]);
