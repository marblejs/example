import { HttpRequest } from '@marblejs/core';
import { InstanceType } from 'typegoose';
import { Movie } from '../model/movie.model';
import { getHostname } from '../../../util';
import { CollectionQueryResult } from '../../common/helpers/collectionQuery.helper';

export const applyHostnameForCollection = (req: HttpRequest) => (result: CollectionQueryResult<any>) => ({
  ...result,
  collection: result.collection.map(applyHostname(req)),
});

export const applyHostname = (req: HttpRequest) => (movie: InstanceType<Movie>): Movie => ({
  ...movie.toJSON(),
  posterUrl: getHostname(req) + '/api/v1/assets' + movie.posterUrl,
});
