import { Effect } from '@marblejs/core';
import { map, flatMap } from 'rxjs/operators';
import { UserDao } from '../model/user.dao';

export const getUsersEffect$: Effect = req$ =>
  req$.pipe(
    flatMap(UserDao.findAllPublic),
    map(body => ({ body })),
  );
