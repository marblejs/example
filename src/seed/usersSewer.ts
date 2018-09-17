import { User } from '../api/user/user.model';

export namespace UsersSewer {

  const UserModel = new User().getModelForClass(User);

  const users = [{
    firstName: 'Brad',
    lastName: 'Pitt',
    email: 'admin@admin.com',
    password: 'admin',
  }];

  export const seed = async () => {
    console.log('- Creating Users');

    await Promise.all(
      users.map(user => new UserModel(user).save())
    );
  };
}
