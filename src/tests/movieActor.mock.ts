import * as faker from 'faker';
import { MovieActor } from '../api/movie/model/movie.model';

export const mockMovieActor = (): MovieActor => ({
  imdbId: faker.random.uuid(),
  name: faker.name.findName() + ' ' + faker.name.lastName(),
});
