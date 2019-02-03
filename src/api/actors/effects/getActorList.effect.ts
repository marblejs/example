import { use, HttpEffect } from '@marblejs/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActorsDao, SORTING_FIELDS } from '../model/actors.dao';
import { applyHostnameForCollection } from '../model/actors.helpers';
import { collectionQueryValidator$ } from '../../common/middlewares/collectionQuery.validator';

export const getActorListEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS })),
    mergeMap(req => of(req).pipe(
      map(req => req.query),
      mergeMap(ActorsDao.findAll),
      map(applyHostnameForCollection(req)),
      map(actors => ({ body: actors })),
    ))
  );
