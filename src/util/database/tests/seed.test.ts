import { Database } from '@database/index';

let usersGeneratorModule;
let actorsGeneratorModule;
let moviesGeneratorModule;

beforeEach(() => {
  jest.unmock('../../../resources/users/fixtures/generators');
  usersGeneratorModule = require('../../../resources/users/fixtures/generators');
  usersGeneratorModule.usersGenerator = jest.fn();

  jest.unmock('../../../resources/actors/fixtures/generators');
  actorsGeneratorModule = require('../../../resources/actors/fixtures/generators');
  actorsGeneratorModule.actorsGenerator = jest.fn();

  jest.unmock('../../../resources/movies/fixtures/generators');
  moviesGeneratorModule = require('../../../resources/movies/fixtures/generators');
  moviesGeneratorModule.moviesGenerator = jest.fn();
});

test('#seed seeds database with registered generators', done => {
  // when
  spyOn(Database, 'connect').and.callFake(() => Promise.resolve());
  spyOn(Database, 'drop').and.callFake(() => Promise.resolve());
  spyOn(Database, 'disconnect').and.callFake(() => Promise.resolve());

  require('../seed');

  // then
  process.nextTick(() => {
    expect(Database.connect).toHaveBeenCalled();
    expect(Database.drop).toHaveBeenCalled();
    expect(usersGeneratorModule.usersGenerator).toHaveBeenCalled();
    expect(actorsGeneratorModule.actorsGenerator).toHaveBeenCalled();
    expect(moviesGeneratorModule.moviesGenerator).toHaveBeenCalled();
    expect(Database.disconnect).toHaveBeenCalled();
    done();
  });
});
