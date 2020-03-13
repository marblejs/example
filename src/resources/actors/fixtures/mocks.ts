import * as faker from 'faker';
import { ActorsMethods } from '../../../resources/actors/api/methods';
import { Gender } from '../../../resources/actors/api/models';

export const mockActor = async () =>
  ActorsMethods.model.create({
    imdbId: faker.random.uuid(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: faker.date.past(),
    country: faker.address.country(),
    gender: faker.random.arrayElement([Gender.FEMALE, Gender.MALE]),
  });
