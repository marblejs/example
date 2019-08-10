import { EffectFactory } from '@marblejs/core';
import { versionEffect$ } from './effects';

export const version$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(versionEffect$);
