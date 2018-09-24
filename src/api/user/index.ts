import { combineRoutes } from '@marblejs/core';
import { getUsers$ } from './effects/getUsers.effect';

export const user$ = combineRoutes('/user', {
  effects: [getUsers$],
  middlewares: [],
});
