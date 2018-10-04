import { Database } from '../connection/database';
import { usersGenerator } from './users.generator';
import { actorsGenerator } from './actors.generator';

const REGISTERED_GENERATORS = [
  // @TODO: add movies generators
  usersGenerator,
  actorsGenerator,
];

const seed = async () => {
  await Database.connect();
  await Database.drop();
  await Promise.all(REGISTERED_GENERATORS.map(generate => generate()));
  await Database.disconnect();
};

seed();
