import { Database } from '@connection';
import { usersGenerator } from './users.generator';
import { actorsGenerator } from './actors.generator';
import { moviesGenerator } from './movies.generator';

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
