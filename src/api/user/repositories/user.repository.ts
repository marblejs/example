import { from } from 'rxjs';
import { UserModel, USER_EXCLUDED_FIELDS } from '../models/user.model';
import { LoginCredentials } from '../../auth/models/login.model';

export namespace UserRepository {
  export const findByCredentials = (credentials: LoginCredentials) => from(
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
