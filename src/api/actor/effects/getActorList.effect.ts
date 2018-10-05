import { Effect } from '@marblejs/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActorDao } from '../model/actor.dao';
import { applyHostnameForCollection } from '../model/actor.helpers';

export const getActorListEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req => of(req).pipe(
      mergeMap(ActorDao.findAll),
      map(applyHostnameForCollection(req)),
      map(actors => ({ body: actors })),
    ))
  );
