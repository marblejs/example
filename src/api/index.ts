import { combineRoutes, EffectFactory } from '@marblejs/core';
import { versionEffect$ } from './common/effects/version.effect';
import { notFoundEffect$ } from './common/effects/notFound.effect';
import { auth$ } from './auth';
import { user$ } from './user';
import { actor$ } from './actor';

const root$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(versionEffect$);

const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(notFoundEffect$);

export const api$ = combineRoutes(
  '/api/v1',
  [root$, auth$, user$, actor$, notFound$],
);
