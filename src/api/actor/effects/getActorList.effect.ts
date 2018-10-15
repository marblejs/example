import { Effect, use } from '@marblejs/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActorDao, SORTING_FIELDS } from '../model/actor.dao';
import { applyHostnameForCollection } from '../model/actor.helpers';
import { collectionQueryValidator$ } from '../../common/middlewares/collectionQuery.validator';
import { CollectionQuery } from '../../common/helpers/collectionQuery.helper';

type Query = CollectionQuery;

export const getActorListEffect$: Effect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS})),
    mergeMap(req => of(req).pipe(
      map(req => req.query as Query),
      mergeMap(ActorDao.findAll),
      map(applyHostnameForCollection(req)),
      map(actors => ({ body: actors })),
    ))
  );
