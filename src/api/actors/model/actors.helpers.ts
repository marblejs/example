import { HttpRequest } from '@marblejs/core';
import { InstanceType } from 'typegoose';
import { getHostname } from '@util';
import { CollectionQueryResult } from '@api/common';
import { Actor } from './actors.model';

export const applyHostnameForCollection = (req: HttpRequest) => (result: CollectionQueryResult<any>) => ({
  ...result,
  collection: result.collection.map(applyHostname(req)),
});

export const applyHostname = (req: HttpRequest) => (actor: InstanceType<Actor>): Actor  => ({
  ...actor.toJSON(),
  photoUrl: getHostname(req) + '/api/v1/assets' + actor.photoUrl,
});
