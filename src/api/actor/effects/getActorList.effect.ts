import { Effect } from '@marblejs/core';
import { map, mergeMap } from 'rxjs/operators';
import { ActorDao } from '../model/actor.dao';

export const getActorListEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(ActorDao.findAll),
    map(actors => ({ body: actors }))
  );
