import { UserRepository } from '../user.repository';
import { AuthCredentials } from '../../auth/auth.model';
import { UserModel } from '../user.model';
import { Database } from '../../../connection/database';

describe('User repository', () => {
  beforeAll(async () => Database.connectTest());

  test('#findByCredentials returns user if found', async (done) => {
    // given
    const user = {
      email: 'test_email',
      password: 'test_password',
      firstName: 'test_firstName',
      lastName: 'test_lastName',
    };
    const credentials: AuthCredentials = { login: 'test_email', password: 'test_password' };

    // when
    await UserModel.create(user);
    const result$ = UserRepository.findByCredentials(credentials);

    // then
    result$.subscribe(result => {
      expect(result.firstName).toEqual(user.firstName);
      expect(result.lastName).toEqual(user.lastName);
      expect(result.email).toEqual(user.email);
      expect(result.password).toBeUndefined();
      done();
    });
  });

  afterEach(async () => Database.drop());
  afterAll(async () => Database.disconnect());
});
