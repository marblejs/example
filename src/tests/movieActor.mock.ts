import * as faker from 'faker';
import { MovieActor } from '../api/movies/model/movies.model';

export const mockMovieActor = (): MovieActor => ({
  imdbId: faker.random.uuid(),
  name: faker.name.findName() + ' ' + faker.name.lastName(),
});
