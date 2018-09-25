import { combineRoutes } from '@marblejs/core';
import { getUsers$ } from './effects/getUsers.effect';
import { authorize$ } from '../auth/middlewares/auth.middleware';

export const user$ = combineRoutes('/user', {
  effects: [getUsers$],
  middlewares: [authorize$],
});
