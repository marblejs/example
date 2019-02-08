import { use, HttpEffect } from '@marblejs/core';
import { collectionQueryValidator$ } from '@api/common';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActorsDao, SORTING_FIELDS, applyHostnameForCollection } from '../model';

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
