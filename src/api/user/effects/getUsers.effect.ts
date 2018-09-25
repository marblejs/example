import { EffectFactory } from '@marblejs/core';
import { map, flatMap } from 'rxjs/operators';
import { UserRepository } from '../repositories/user.repository';

export const getUsers$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(req$ => req$.pipe(
    flatMap(UserRepository.findAll),
    map(body => ({ body })),
  ));
