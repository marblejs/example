import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';
import { flatMap } from 'rxjs/operators';
import { Payload } from '../helpers/token.helper';
import { UsersDao } from '../../users/model/users.dao';
import { Config } from '../../../config';
import { neverNullable } from '../../../util';

const jwtConfig: VerifyOptions = ({ secret: Config.jwt.secret });

export const verifyPayload$ = (payload: Payload) =>
  UsersDao
    .findById(payload._id)
    .pipe(flatMap(neverNullable));

export const authorize$ = jwt$(jwtConfig, verifyPayload$);
