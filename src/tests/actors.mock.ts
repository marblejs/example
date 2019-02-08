import * as faker from 'faker';
import { ActorsDao, Gender } from '@api/actors';

export const mockActor = async () =>
  ActorsDao.model.create({
    imdbId: faker.random.uuid(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: faker.date.past(),
    country: faker.address.country(),
    gender: faker.random.arrayElement([Gender.FEMALE, Gender.MALE]),
  });
