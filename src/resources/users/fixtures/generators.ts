import * as faker from 'faker';
import { generateCollectionFromModel } from '../../../util/database/mocks';
import { UserRole, User } from '../api/models';

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

export const usersGenerator = generateCollectionFromModel(User)(users);
