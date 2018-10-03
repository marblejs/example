import * as faker from 'faker';
import { UserRole } from '../api/user/model/user.model';
import { UserDao } from '../api/user/model/user.dao';

export const mockUser = async (roles = [UserRole.USER]) =>
  UserDao.model.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roles,
  });
