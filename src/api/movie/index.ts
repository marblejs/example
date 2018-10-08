import { combineRoutes, EffectFactory } from '@marblejs/core';
import { authorize$ } from '../auth/middlewares/auth.middleware';
import { getMovieEffect$ } from './effects/getMovie.effect';
import { getMovieListEffect$ } from './effects/getMovieList.effect';

const getMovieList$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getMovieListEffect$);

const getMovie$ = EffectFactory
  .matchPath('/:id')
  .matchType('GET')
  .use(getMovieEffect$);

export const movie$ = combineRoutes('/movie', {
  effects: [getMovieList$, getMovie$],
  middlewares: [authorize$],
});
