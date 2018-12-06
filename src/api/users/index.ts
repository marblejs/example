import { combineRoutes, EffectFactory } from '@marblejs/core';
import { getUserListEffect$ } from './effects/getUserList.effect';
import { getMeEffect$ } from './effects/getMe.effect';
import { authorize$ } from '../auth/middlewares/auth.middleware';

export const getUserList$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getUserListEffect$);

export const getMe$ = EffectFactory
  .matchPath('/me')
  .matchType('GET')
  .use(getMeEffect$);

export const users$ = combineRoutes('/users', {
  effects: [getUserList$, getMe$],
  middlewares: [authorize$],
});
