import { User, UserRole } from '../api/user/user.model';
import * as faker from 'faker';

export namespace UsersGenerator {

  const UserModel = new User().getModelForClass(User);

  const users = [
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'admin@admin.com',
      password: 'admin',
      roles: [UserRole.ADMIN]
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'user@user.com',
      password: 'user',
      roles: [UserRole.USER]
    }
  ];

  export const generate = async () => {
    console.log('- Creating Users');

    await Promise.all(
      users.map(user => new UserModel(user).save())
    );
  };
}
