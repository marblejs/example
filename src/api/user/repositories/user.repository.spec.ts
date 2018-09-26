import { UserRepository } from './user.repository';
import { LoginCredentials } from '../../auth/models/login.model';
import { Database } from '../../../connection/database';

describe('User repository', () => {
  beforeAll(async () => Database.connectTest());

  test('#findByCredentials finds user by credentials', async (done) => {
    // given
    const user = {
      email: 'test_email',
      password: 'test_password',
      firstName: 'test_firstName',
      lastName: 'test_lastName',
    };
    const credentials: LoginCredentials = { login: 'test_email', password: 'test_password' };

    // when
    await UserRepository.model.create(user);
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

  test('#findById finds user by given ID', async (done) => {
    // given
    const user = {
      email: 'test_email',
      password: 'test_password',
      firstName: 'test_firstName',
      lastName: 'test_lastName',
    };

    // when
    const { id } = await UserRepository.model.create(user);
    const result$ = UserRepository.findById(id);

    // then
    result$.subscribe(result => {
      expect(result.firstName).toEqual(user.firstName);
      expect(result.lastName).toEqual(user.lastName);
      expect(result.email).toEqual(user.email);
      expect(result.password).toBeUndefined();
      done();
    });
  });

  test('#findAll finds all users', async (done) => {
    // given
    const user = {
      email: 'test_email',
      password: 'test_password',
      firstName: 'test_firstName',
      lastName: 'test_lastName',
    };

    // when
    await UserRepository.model.create(user);
    await UserRepository.model.create(user);
    const result$ = UserRepository.findAll();

    // then
    result$.subscribe(result => {
      expect(result.length).toEqual(2);
      done();
    });
  });

  afterEach(async () => Database.drop());
  afterAll(async () => Database.disconnect());
});
