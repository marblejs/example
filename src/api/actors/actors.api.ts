import { combineRoutes, EffectFactory } from '@marblejs/core';
import { authorize$ } from '@api/auth';
import { getActorListEffect$, getActorEffect$ } from './effects';

const getActorList$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getActorListEffect$);

const getActor$ = EffectFactory
  .matchPath('/:id')
  .matchType('GET')
  .use(getActorEffect$);

export const actors$ = combineRoutes('/actors', {
  effects: [getActorList$, getActor$],
  middlewares: [authorize$],
});
