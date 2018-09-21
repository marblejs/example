import * as jwt from '../shared/middlewares';
import { Config } from '../../config';

export const authorize$ = jwt.authorize$({
  secret: Config.jwt.secret,
});
