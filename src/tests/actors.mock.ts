import * as faker from 'faker';
import { ActorsDao } from '../api/actors/model/actors.dao';
import { Gender } from '../api/actors/model/actors.model';

export const mockActor = async () =>
  ActorsDao.model.create({
    imdbId: faker.random.uuid(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: faker.date.past(),
    country: faker.address.country(),
    gender: faker.random.arrayElement([Gender.FEMALE, Gender.MALE]),
  });
