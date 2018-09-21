import { EffectFactory, combineRoutes } from '@marblejs/core';
import { map, flatMap } from 'rxjs/operators';
import { authorize$ } from '../auth/auth.middleware';
import { UserRepository } from './user.repository';

const getUsers$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(req$ => req$.pipe(
    flatMap(UserRepository.findAll),
    map(body => ({ body })),
  ));

export const user$ = combineRoutes('/user', {
  effects: [getUsers$],
  middlewares: [authorize$],
});
