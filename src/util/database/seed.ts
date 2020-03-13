import { Database } from '@database/index';
import { usersGenerator } from '../../resources/users/fixtures/generators';
import { actorsGenerator } from '../../resources/actors/fixtures/generators';
import { moviesGenerator } from '../../resources/movies/fixtures/generators';

const REGISTERED_GENERATORS = [
  usersGenerator,
  actorsGenerator,
  moviesGenerator,
];

const seed = async () => {
  await Database.connect();
  await Database.drop();
  await Promise.all(REGISTERED_GENERATORS.map(generate => generate()));
  await Database.disconnect();
};

seed();
