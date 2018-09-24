import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';
import { flatMap } from 'rxjs/operators';
import { Payload } from '../helpers/token.helper';
import { Config } from '../../../config';
import { UserRepository } from '../../user';
import { neverNullable } from '../../../util';

const jwtConfig: VerifyOptions = ({ secret: Config.jwt.secret });

const verifyPayload$ = (payload: Payload) =>
  UserRepository
    .findById(payload._id)
    .pipe(flatMap(neverNullable));

export const authorize$ = jwt$(jwtConfig, verifyPayload$);
