import { combineRoutes } from '@marblejs/core';
import { getUsers$ } from './effects/getUsers.effect';
import { authorize$ } from '../auth';

export * from './repositories';
export * from './models';

export const user$ = combineRoutes('/user', {
  effects: [getUsers$],
  middlewares: [authorize$],
});
