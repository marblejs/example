import { prop, Typegoose, pre } from 'typegoose';
import { MongooseDocument } from 'mongoose';

export type ActorDocument = Actor & MongooseDocument;

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

const setPhotoUrl = (doc: ActorDocument) => {
  doc.photoUrl = `/img/actors/${doc.imdbId}.jpg`;
};

@pre<Actor>('save', function(next) {
  setPhotoUrl(this);
  next();
})
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
