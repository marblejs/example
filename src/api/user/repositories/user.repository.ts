import { from } from 'rxjs';
import { LoginCredentials } from '../../auth/models/login.model';
import { USER_EXCLUDED_FIELDS, UserModel } from '../models/user.model';

export namespace UserRepository {
  export const findUserByCredentials = (credentials: LoginCredentials) => from(
    UserModel.findOne({ email: credentials.login, password: credentials.password })
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );
}
