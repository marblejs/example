import { combineRoutes } from '@marblejs/core';
import { notFound$ } from './effects/notFound.effect';
import { root$ } from './effects/root.effect';
import { auth$ } from '../auth';
import { user$ } from '../user';

export const api$ = combineRoutes(
  '/api/v1',
  [root$, auth$, user$, notFound$],
);
