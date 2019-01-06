import { Effect, use } from '@marblejs/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { collectionQueryValidator$, CollectionQueryOptions } from '@api/common';
import { ActorsDao, SORTING_FIELDS, applyHostnameForCollection } from '../model';

type Query = CollectionQueryOptions;

export const getActorListEffect$: Effect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS})),
    mergeMap(req => of(req).pipe(
      map(req => req.query as Query),
      mergeMap(ActorsDao.findAll),
      map(applyHostnameForCollection(req)),
      map(actors => ({ body: actors })),
    ))
  );
