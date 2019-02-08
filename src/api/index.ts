import { combineRoutes, EffectFactory } from '@marblejs/core';
import { versionEffect$, preflightEffect$, getFileEffect$, notFoundEffect$ } from './common/effects';
import { auth$ } from './auth';
import { users$ } from './users';
import { actors$ } from './actors';
import { movies$ } from './movies';

const root$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(versionEffect$);

const preflight$ = EffectFactory
  .matchPath('*')
  .matchType('OPTIONS')
  .use(preflightEffect$);

const getFile$ = EffectFactory
  .matchPath('/assets/:dir*')
  .matchType('GET')
  .use(getFileEffect$);

const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(notFoundEffect$);

export const api$ = combineRoutes('/api/v1', [
  root$,
  auth$,
  users$,
  actors$,
  movies$,
  getFile$,
  preflight$,
  notFound$
]);
