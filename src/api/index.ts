import { combineRoutes } from '@marblejs/core';
import { auth$ } from './auth';
import { notFound$ } from './common/effects/not-found.effect';
import { root$ } from './common/effects/root.effect';

export const api$ = combineRoutes(
  '/api/v1',
  [root$, auth$, notFound$],
);
