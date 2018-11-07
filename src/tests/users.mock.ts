import * as faker from 'faker';
import { UserRole } from '../api/users/model/users.model';
import { UsersDao } from '../api/users/model/users.dao';

export const mockUser = async (roles = [UserRole.USER]) =>
  UsersDao.model.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roles,
  });
