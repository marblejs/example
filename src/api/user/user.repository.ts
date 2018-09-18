import { from } from 'rxjs';
import { User, USER_EXCLUDED_FIELDS } from './user.model';
import { AuthCredentials } from '../auth/auth.model';

export namespace UserRepository {
  export const model = new User().getModelForClass(User);

  export const findUserByCredentials = (credentials: AuthCredentials) => from(
    model.findOne({ email: credentials.login, password: credentials.password })
      .select(USER_EXCLUDED_FIELDS)
      .exec()
  );
}
