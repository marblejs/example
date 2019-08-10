import * as faker from 'faker';
import { UsersMethods } from '../api/methods';
import { UserRole } from '../api/models';

export const mockUser = async (roles = [UserRole.USER]) =>
  UsersMethods.model.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roles,
  });
