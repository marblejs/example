import { Database } from '@database/index';

beforeAll(async () => {
  await Database.connectTest();
});

afterEach(async () => {
  await Database.drop();
});

afterAll(async () => {
  await Database.disconnect();
});
