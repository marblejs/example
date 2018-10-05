import * as faker from 'faker';
import { ActorDao } from '../api/actor/model/actor.dao';
import { Gender } from '../api/actor/model/actor.model';

export const mockActor = async () =>
  ActorDao.model.create({
    imdbId: faker.random.uuid(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: faker.date.past(),
    country: faker.address.country(),
    gender: faker.random.arrayElement([Gender.FEMALE, Gender.MALE]),
  });
