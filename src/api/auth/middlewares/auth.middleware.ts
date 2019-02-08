import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';
import { flatMap } from 'rxjs/operators';
import { neverNullable } from '@util';
import { Config } from '@config';
import { UsersDao } from '@api/users/model';
import { Payload } from '../helpers';

const jwtConfig: VerifyOptions = ({ secret: Config.jwt.secret });

export const verifyPayload$ = (payload: Payload) =>
  UsersDao
    .findById(payload._id)
    .pipe(flatMap(neverNullable));

export const authorize$ = jwt$(jwtConfig, verifyPayload$);
