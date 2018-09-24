import { from } from 'rxjs';
import { UserModel, USER_EXCLUDED_FIELDS } from '../models';
import { LoginCredentials } from '../../auth';

export namespace UserRepository {
  export const findByCredentials = (credentials: LoginCredentials) => from(
    UserModel.findOne({ email: credentials.login, password: credentials.password })
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );

  export const findById = (id: string ) => from(
    UserModel.findById(id)
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );

  export const findAll = () => from(
    UserModel.find()
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );
}
