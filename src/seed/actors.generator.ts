import { generateCollectionFromModel } from './generator';
import { Actor, Gender } from '@api/actors';

const actors = [
  {
    imdbId: 'nm0000093',
    name: 'Brad Pitt',
    birthday: new Date('1963-12-18'),
    country: 'USA',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm0001401',
    name: 'Angelina Jolie',
    birthday: new Date('1975-06-04'),
    country: 'USA',
    gender: Gender.FEMALE,
  },
  {
    imdbId: 'nm0000375',
    name: 'Robert Downey Jr.',
    birthday: new Date('1965-04-04'),
    country: 'USA',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm0000569',
    name: 'Gwyneth Paltrow',
    birthday: new Date('1972-09-27'),
    country: 'USA',
    gender: Gender.FEMALE,
  },
  {
    imdbId: 'nm1165110',
    name: 'Chris Hemsworth',
    birthday: new Date('1983-08-11'),
    country: 'Australia',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm0262635',
    name: 'Chris Evans',
    birthday: new Date('1981-06-13'),
    country: 'USA',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm0749263',
    name: 'Mark Ruffalo',
    birthday: new Date('1967-11-22'),
    country: 'USA',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm1130627',
    name: 'Cobie Smulders',
    birthday: new Date('1982-04-3'),
    country: 'Canada',
    gender: Gender.FEMALE,
  },
  {
    imdbId: 'nm0000168',
    name: 'Samuel L. Jackson',
    birthday: new Date('1948-12-21'),
    country: 'USA',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm0910607',
    name: 'Christoph Waltz',
    birthday: new Date('1956-10-04'),
    country: 'Austria',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm0004937',
    name: 'Jamie Foxx',
    birthday: new Date('1967-12-13'),
    country: 'USA',
    gender: Gender.MALE,
  },
  {
    imdbId: 'nm0000235',
    name: 'Uma Thurman',
    birthday: new Date('1970-04-29'),
    country: 'USA',
    gender: Gender.FEMALE,
  },
];

export const actorsGenerator = generateCollectionFromModel(Actor)(actors);
