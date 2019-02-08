import * as faker from 'faker';
import { MovieActor } from '@api/movies';

export const mockMovieActor = (): MovieActor => ({
  imdbId: faker.random.uuid(),
  name: faker.name.findName() + ' ' + faker.name.lastName(),
});
