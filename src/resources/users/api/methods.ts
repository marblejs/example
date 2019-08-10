import { from } from 'rxjs';
import { LoginCredentials } from '../../auth/api/models';
import { User, USER_SECURE_FIELDS, USER_PUBLIC_FIELDS } from './models';

export namespace UsersMethods {
  export const model = new User().getModelForClass(User);

  export const findByCredentials = (credentials: LoginCredentials) => from(
    model.findOne({
        email: credentials.login,
        password: credentials.password,
      })
      .select(USER_SECURE_FIELDS)
      .exec()
  );

  export const findById = (id: string) => from(
    model.findById(id)
      .select(USER_SECURE_FIELDS)
      .exec()
  );

  export const findByIdPublic = (id: string) => from(
    model.findById(id)
      .select(USER_PUBLIC_FIELDS)
      .exec()
  );

  export const findAll = () => from(
    model.find()
      .select(USER_SECURE_FIELDS)
      .exec()
  );

  export const findAllPublic = () => from(
    model.find()
      .select(USER_PUBLIC_FIELDS)
      .exec()
  );
}
