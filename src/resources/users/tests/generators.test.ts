import { usersGenerator } from '../fixtures/generators';

let generatorModule;

beforeEach(() => {
  jest.unmock('../fixtures/generators');
  generatorModule = require('../fixtures/generators');
  generatorModule.generateCollectionFromModel = jest.fn(
    () => jest.fn(
      () => Promise.resolve()
    )
  );
});

test('#usersGenerator seeds users collection', async () => {
  expect(async () => await usersGenerator()).not.toThrow();
});
