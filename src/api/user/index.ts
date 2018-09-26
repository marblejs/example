import { combineRoutes, EffectFactory } from '@marblejs/core';
import { getUsersEffect$ } from './effects/getUsers.effect';
import { getMeEffect$ } from './effects/getMe.effect';
import { authorize$ } from '../auth/middlewares/auth.middleware';

export const getUsers$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getUsersEffect$);

export const getMe$ = EffectFactory
  .matchPath('/me')
  .matchType('GET')
  .use(getMeEffect$);

export const user$ = combineRoutes('/user', {
  effects: [getUsers$, getMe$],
  middlewares: [authorize$],
});
