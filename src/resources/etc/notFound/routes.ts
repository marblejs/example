import { EffectFactory } from '@marblejs/core';
import { notFoundEffect$ } from './effects';

export const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(notFoundEffect$);
