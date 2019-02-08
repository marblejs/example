import { combineRoutes, EffectFactory } from '@marblejs/core';
import { authorize$ } from '@api/auth';
import { getUserListEffect$, getMeEffect$ } from './effects';

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
