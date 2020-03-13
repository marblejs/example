import { combineRoutes } from '@marblejs/core';

import { version$ } from './etc/version/routes';
import { preflight$ } from './etc/preflight/routes';
import { getFile$ } from './etc/getFiles/routes';
import { notFound$ } from './etc/notFound/routes';

import { auth$ } from './auth/api/routes';
import { users$ } from './users/api/routes';
import { actors$ } from './actors/api/routes';
import { movies$ } from './movies/api/routes';

export const routes$ = combineRoutes('/api/v1', [
  version$,

  auth$,
  users$,
  actors$,
  movies$,

  getFile$,
  preflight$,
  notFound$
]);
