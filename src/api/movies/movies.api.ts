import { combineRoutes, EffectFactory } from '@marblejs/core';
import { authorize$ } from '@api/auth';
import { getMovieEffect$, getMovieListEffect$ } from './effects';

const getMovieList$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getMovieListEffect$);

const getMovie$ = EffectFactory
  .matchPath('/:id')
  .matchType('GET')
  .use(getMovieEffect$);

export const movies$ = combineRoutes('/movies', {
  effects: [getMovieList$, getMovie$],
  middlewares: [authorize$],
});
