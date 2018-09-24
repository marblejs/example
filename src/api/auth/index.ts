import { combineRoutes } from '@marblejs/core';
import { login$ } from './effects/login.effect';

export * from './models';
export * from './middlewares';

export const auth$ = combineRoutes('/auth', [login$]);
