import { combineRoutes, EffectFactory } from '@marblejs/core';
import { authorize$ } from '../auth/middlewares/auth.middleware';
import { getActorListEffect$ } from './effects/getActorList.effect';
import { getActorEffect$ } from './effects/getActor.effect';

const getActorList$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getActorListEffect$);

const getActor$ = EffectFactory
  .matchPath('/:id')
  .matchType('GET')
  .use(getActorEffect$);

export const actor$ = combineRoutes('/actor', {
  effects: [getActorList$, getActor$],
  middlewares: [authorize$],
});
