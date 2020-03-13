import { HttpRequest } from '@marblejs/core';
import { InstanceType } from 'typegoose';
import { getHostname } from '../../../util/server/requests';
import { CollectionQueryResult } from '../../../util/database/queries';
import { Actor } from './models';

export const applyHostname = (req: HttpRequest) => (actor: InstanceType<Actor>): Actor  => ({
  ...actor.toJSON(),
  photoUrl: getHostname(req) + '/api/v1/assets' + actor.photoUrl,
});

export const applyHostnameForCollection = (req: HttpRequest) => (result: CollectionQueryResult<any>) => ({
  ...result,
  collection: result.collection.map(applyHostname(req)),
});
