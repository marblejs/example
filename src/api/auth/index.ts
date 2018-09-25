import { combineRoutes } from '@marblejs/core';
import { login$ } from './effects/login.effect';

export const auth$ = combineRoutes('/auth', [login$]);
