import { Effect, use } from '@marblejs/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActorsDao, SORTING_FIELDS } from '../model/actors.dao';
import { applyHostnameForCollection } from '../model/actors.helpers';
import { collectionQueryValidator$ } from '../../common/middlewares/collectionQuery.validator';
import { CollectionQueryOptions } from '../../common/helpers/collectionQuery.helper';

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
