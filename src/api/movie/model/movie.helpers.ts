import { HttpRequest } from '@marblejs/core';
import { InstanceType } from 'typegoose';
import { Movie } from '../model/movie.model';
import { getHostname } from '../../../util';

export const applyHostnameForCollection = (req: HttpRequest) => (movies: InstanceType<Movie>[]) =>
  movies.map(applyHostname(req));

export const applyHostname = (req: HttpRequest) => (movie: InstanceType<Movie>): Movie => ({
  ...movie.toJSON(),
  posterUrl: getHostname(req) + '/api/v1/assets' + movie.posterUrl,
});
