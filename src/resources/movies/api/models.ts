import { prop, Typegoose, pre, arrayProp } from 'typegoose';
import { MongooseDocument } from 'mongoose';

export type MovieDocument = Movie & MongooseDocument;

export interface MovieActor {
  imdbId: string;
  name: string;
}

export enum MovieGenre {
  ACTION = 'action',
  ADVENTURE = 'adventure',
  ANIMATION = 'animation',
  CRIME = 'crime',
  THRILLER = 'thriller',
  SHORT = 'short',
  MYSTERY = 'mystery',
  DOCUMENTARY = 'documentary',
  SPORT = 'sport',
  REALITY_TY = 'reality-tv',
  BIOGRAPHY = 'biography',
  NEWS = 'news',
  FILM_NOIR = 'film-noir',
  DRAME = 'drama',
  COMEDY = 'comedy',
  FANTASY = 'fantasy',
  FAMILY = 'family',
  ROMANCE = 'romance',
  HORROR = 'horror',
  WAR = 'war',
  GAME_SHOW = 'game-show',
  MUSIC = 'music',
  TALK_SHOW = 'talk-show',
  ADULT = 'adult',
  SCI_FI = 'sci-fi',
}

const setPosterUrl = (doc: MovieDocument) => {
  doc.posterUrl = `/img/movies/${doc.imdbId}.jpg`;
};

@pre<Movie>('save', function(next) {
  setPosterUrl(this);
  next();
})
export class Movie extends Typegoose {
  @prop({ required: true, index: true })
  imdbId?: string;

  @prop({ required: true })
  title?: string;

  @prop({ required: true })
  director?: string;

  @prop({ required: true })
  year?: number;

  @prop({ required: true })
  metascore?: number;

  @arrayProp({ required: true, items: String, enum: MovieGenre })
  genres?: MovieGenre[];

  @arrayProp({ items: Object, default: [] })
  actors: MovieActor[] = [];

  @prop()
  posterUrl?: string;
}
