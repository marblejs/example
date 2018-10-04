import { prop, Typegoose } from 'typegoose';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class Actor extends Typegoose {
  @prop({ required: true, index: true })
  imdbId?: string;

  @prop({ required: true })
  name?: string;

  @prop({ required: true })
  birthday?: string;

  @prop({ required: true })
  country?: string;

  @prop()
  deathday?: string;

  @prop({ required: true, enum: Gender })
  gender?: Gender;

  @prop()
  photoUrl?: string;
}
