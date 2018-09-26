import { Database } from '../connection/database';

beforeAll(async () => {
  await Database.connectTest();
});

afterEach(async () => {
  await Database.drop();
});

afterAll(async () => {
  await Database.disconnect();
});
