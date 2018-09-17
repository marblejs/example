import { arrayProp, prop, Typegoose } from 'typegoose';

export enum UserRole {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export class User extends Typegoose {
  @prop({ required: true })
  firstName?: string;

  @prop({ required: true })
  lastName?: string;

  @prop({ required: true })
  email?: string;

  @prop({ required: true })
  password?: string;

  @arrayProp({ items: String, enum: UserRole })
  roles?: UserRole[];
}

export const USER_EXCLUDED_FIELDS = {
  password: 0,
  __v: 0,
};
