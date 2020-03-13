import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';
import { flatMap } from 'rxjs/operators';
import { neverNullable } from '../../../util/etc/rxjs';
import { Config } from '@config';
import { UsersMethods } from '../../../resources/users/api/methods';
import { Payload } from './helpers';

const jwtConfig: VerifyOptions = ({ secret: Config.jwt.secret });

export const verifyPayload$ = (payload: Payload) =>
  UsersMethods
    .findById(payload._id)
    .pipe(flatMap(neverNullable));

export const authorize$ = jwt$(jwtConfig, verifyPayload$);
