import { internal } from '@marblejs/core';
import * as jwt from 'jsonwebtoken';
import { InstanceType } from 'typegoose';
import { User } from '../../../user/user.model';
import { Config } from '../../../../config';

const { Maybe } = internal;

export type UserJWTPayload = ReturnType<typeof generateTokenPayloadForUser>;

export const generateJWT = (payload: object) =>
  jwt.sign(payload, Config.jwt.secret);

export const generateExpirationTimeInHours = (hours = 1) =>
  Math.floor(Date.now() / 1000) + (60 * 60 * hours);

export const generateTokenPayloadForUser = (user: InstanceType<User>) => ({
  _id: user._id,
  email: user.email,
  exp: generateExpirationTimeInHours(12),
});

export const generateTokenForUser = (user: InstanceType<User>) =>
  Maybe.of(user)
    .map(generateTokenPayloadForUser)
    .map(generateJWT)
    .valueOr('');


