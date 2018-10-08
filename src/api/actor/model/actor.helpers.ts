import { HttpRequest } from '@marblejs/core';
import { InstanceType } from 'typegoose';
import { Actor } from '../model/actor.model';
import { getHostname } from '../../../util';

export const applyHostnameForCollection = (req: HttpRequest) => (actors: InstanceType<Actor>[]) =>
  actors.map(applyHostname(req));

export const applyHostname = (req: HttpRequest) => (actor: InstanceType<Actor>): Actor  => ({
  ...actor.toJSON(),
  photoUrl: getHostname(req) + '/api/v1/assets' + actor.photoUrl,
});
