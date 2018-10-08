import * as faker from 'faker';
import { MovieDao } from '../api/movie/model/movie.dao';
import { MovieGenre, MovieActor } from '../api/movie/model/movie.model';

const movieGenres = Object.values(MovieGenre);

export const mockMovie = async (actors: MovieActor[] = []) =>
  MovieDao.model.create({
    imdbId: faker.random.uuid(),
    title: faker.name.title(),
    director: faker.name.findName() + ' ' + faker.name.lastName(),
    year: faker.random.number({ min: 1800, max: 2018 }),
    metascore: faker.random.number({ min: 0, max: 100 }),
    genres: [faker.random.arrayElement(movieGenres)],
    actors,
  });
