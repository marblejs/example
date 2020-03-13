import { mockUser } from '../fixtures/mocks';
import { LoginCredentials } from '../../../resources/auth/api/models';
import { UsersMethods } from '../api/methods';

describe('Users DAO', () => {
  test('#findByCredentials finds user by credentials', async (done) => {
    // given
    const user = await mockUser();
    const credentials: LoginCredentials = { login: user.email!, password: user.password! };

    // when
    const result$ = UsersMethods.findByCredentials(credentials);

    // then
    result$.subscribe(result => {
      if (!result) { return fail('User should be found'); }

      expect(result.firstName).toEqual(user.firstName);
      expect(result.lastName).toEqual(user.lastName);
      expect(result.email).toEqual(user.email);
      expect(result.roles![0]).toEqual(user.roles![0]);
      expect(result.password).toBeUndefined();
      done();
    });
  });

  test('#findById finds user by given ID', async (done) => {
    // given
    const user = await mockUser();

    // when
    const result$ = UsersMethods.findById(user.id);

    // then
    result$.subscribe(result => {
      if (!result) { return fail('User should be found'); }

      expect(result.firstName).toEqual(user.firstName);
      expect(result.lastName).toEqual(user.lastName);
      expect(result.email).toEqual(user.email);
      expect(result.roles![0]).toEqual(user.roles![0]);
      expect(result.password).toBeUndefined();
      done();
    });
  });

  test('#findByIdPublic finds user by given ID in public scope', async (done) => {
    // given
    const user = await mockUser();

    // when
    const result$ = UsersMethods.findByIdPublic(user.id);

    // then
    result$.subscribe(result => {
      if (!result) { return fail('User should be found'); }

      expect(result._id).toEqual(user._id);
      expect(result.firstName).toEqual(user.firstName);
      expect(result.lastName).toEqual(user.lastName);
      expect(result.email).toBeUndefined();
      expect(result.password).toBeUndefined();
      expect(result.roles).toBeUndefined();
      done();
    });
  });

  test('#findAll finds all users', async (done) => {
    // given
    const users = [await mockUser(), await mockUser()];

    // when
    const result$ = UsersMethods.findAll();

    // then
    result$.subscribe(result => {
      result.forEach((item, i) => {
        const reference = users[i];
        expect(item._id).toEqual(reference._id);
        expect(item.firstName).toEqual(reference.firstName);
        expect(item.lastName).toEqual(reference.lastName);
        expect(item.email).toEqual(reference.email);
        expect(item.roles![0]).toEqual(reference.roles![0]);
        expect(item.password).toBeUndefined();
        done();
      });
    });
  });

  test('#findAllPublic finds all users in public scope', async (done) => {
    // given
    const users = [await mockUser(), await mockUser()];

    // when
    const result$ = UsersMethods.findAllPublic();

    // then
    result$.subscribe(result => {
      result.forEach((item, i) => {
        const reference = users[i];
        expect(item._id).toEqual(reference._id);
        expect(item.firstName).toEqual(reference.firstName);
        expect(item.lastName).toEqual(reference.lastName);
        expect(item.email).toBeUndefined();
        expect(item.roles).toBeUndefined();
        expect(item.password).toBeUndefined();
        done();
      });
    });
  });
});
