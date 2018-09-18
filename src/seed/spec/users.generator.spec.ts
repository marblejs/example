import { usersGenerator } from '../users.generator';

let generatorModule;

beforeEach(() => {
  jest.unmock('../generator');
  generatorModule = require('../generator');
  generatorModule.generateCollectionFromModel = jest.fn(
    () => jest.fn(
      () => Promise.resolve()
    )
  );
});

test('#usersGenerator seeds users collection', async () => {
  expect(async () => await usersGenerator()).not.toThrow();
});
