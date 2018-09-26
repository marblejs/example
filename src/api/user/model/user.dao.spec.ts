import { UserDao } from './user.dao';
import { LoginCredentials } from '../../auth/model/login.model';
import { UserModel } from '../model/user.model';
import { Database } from '../../../connection/database';

describe('User DAO', () => {
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
    await UserModel.create(user);
    const result$ = UserDao.findByCredentials(credentials);

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
    const { id } = await UserModel.create(user);
    const result$ = UserDao.findById(id);

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
    await UserModel.create(user);
    await UserModel.create(user);
    const result$ = UserDao.findAll();

    // then
    result$.subscribe(result => {
      expect(result.length).toEqual(2);
      done();
    });
  });

  afterEach(async () => Database.drop());
  afterAll(async () => Database.disconnect());
});
