import { EffectFactory } from '@marblejs/core';
import { preflightEffect$ } from './effects';

export const preflight$ = EffectFactory
  .matchPath('*')
  .matchType('OPTIONS')
  .use(preflightEffect$);
