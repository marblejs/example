import { combineRoutes } from '@marblejs/core';
import { auth$ } from '../auth';
import { notFound$ } from './effects/not-found.effect';
import { root$ } from './effects/root.effect';

export const api$ = combineRoutes(
  '/api/v1',
  [root$, auth$, notFound$],
);
