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

export const USER_SECURE_FIELDS = {
  password: 0,
};

export const USER_PUBLIC_FIELDS = {
  ...USER_SECURE_FIELDS,
  email: 0,
  roles: 0,
};
