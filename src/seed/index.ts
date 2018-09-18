import { Database } from '../connection/database';
import { usersGenerator } from './users.generator';

const REGISTERED_GENERATORS = [
  // @TODO: add movies/actors generators
  usersGenerator,
];

const seed = async () => {
  await Database.connect();
  await Database.drop();
  await Promise.all(REGISTERED_GENERATORS.map(generate => generate()));
  await Database.disconnect();
};

seed();
