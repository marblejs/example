import { combineRoutes } from '@marblejs/core';
import { auth$ } from './auth';
import { notFound$ } from './root/effects/not-found.effect';
import { root$ } from './root/effects/root.effect';

export const api$ = combineRoutes(
  '/api/v1',
  [root$, auth$, notFound$],
);
