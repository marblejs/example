import { from } from 'rxjs';
import { User, USER_EXCLUDED_FIELDS } from '../models/user.model';
import { LoginCredentials } from '../../auth/models/login.model';

export namespace UserRepository {

  export const model = new User().getModelForClass(User);

  export const findByCredentials = (credentials: LoginCredentials) => from(
    model.findOne({ email: credentials.login, password: credentials.password })
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );

  export const findById = (id: string ) => from(
    model.findById(id)
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );

  export const findAll = () => from(
    model.find()
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );
}
