import { combineRoutes, EffectFactory } from '@marblejs/core';
import { authorize$ } from '../../../resources/auth/api/methods';
import { getMeEffect$, getUserListEffect$ } from './effects';

const getMe$ = EffectFactory
  .matchPath('/me')
  .matchType('GET')
  .use(getMeEffect$);

const getUserList$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getUserListEffect$);

export const users$ = combineRoutes('/users', {
  effects: [getMe$, getUserList$],
  middlewares: [authorize$],
});
