import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {
  @prop({ required: true })
  firstName?: string;

  @prop({ required: true })
  lastName?: string;

  @prop({ required: true })
  email?: string;

  @prop({ required: true })
  password?: string;
}
