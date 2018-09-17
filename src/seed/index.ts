import { Database } from '../connection/database';
import { UsersSewer } from './usersSewer';
import { ActorsSewer } from './actorsSewer';
import { MoviesSewer } from './moviesSewer';

const REGISTERED_SEWERS = [
  UsersSewer,
  ActorsSewer,
  MoviesSewer,
];

const seed = async () => {
  await Database.connect();
  await Database.drop();
  await Promise.all(REGISTERED_SEWERS.map(creator => creator.seed()));
  await Database.disconnect();
};

seed();
