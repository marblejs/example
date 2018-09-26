import { combineRoutes, EffectFactory } from '@marblejs/core';
import { getUsersEffect$ } from './effects/getUsers.effect';
import { authorize$ } from '../auth/middlewares/auth.middleware';

export const getUsers$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getUsersEffect$);

export const user$ = combineRoutes('/user', {
  effects: [getUsers$],
  middlewares: [authorize$],
});
