import { from } from 'rxjs';
import { UserModel, USER_EXCLUDED_FIELDS } from './user.model';
import { AuthCredentials } from '../auth/auth.model';

export namespace UserRepository {
  export const findByCredentials = (credentials: AuthCredentials) => from(
    UserModel.findOne({ email: credentials.login, password: credentials.password })
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );

  export const findAll = () => from(
    UserModel.find()
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );
}
