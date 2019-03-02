import { HttpEffect } from '@marblejs/core';
import { map, flatMap } from 'rxjs/operators';
import { UsersDao } from '../model';

export const getUserListEffect$: HttpEffect = req$ =>
  req$.pipe(
    flatMap(UsersDao.findAllPublic),
    map(body => ({ body })),
  );
