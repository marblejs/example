import { Database } from '../connection/database';
import { UsersGenerator } from './users.generator';
import { ActorsGenerator } from './actors.generator';
import { MoviesGenerator } from './movies.generator';

const REGISTERED_SEWERS = [
  UsersGenerator,
  ActorsGenerator,
  MoviesGenerator,
];

const seed = async () => {
  await Database.connect();
  await Database.drop();
  await Promise.all(REGISTERED_SEWERS.map(creator => creator.generate()));
  await Database.disconnect();
};

seed();
