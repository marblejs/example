import { EffectFactory } from '@marblejs/core';
import { getFileEffect$ } from './effects';

export const getFile$ = EffectFactory
  .matchPath('/assets/:dir*')
  .matchType('GET')
  .use(getFileEffect$);
