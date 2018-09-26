import { generateCollectionFromModel } from '../generator';

const saveMock = jest.fn(() => Promise.resolve());

class ModelMock {
  getModelForClass = () => class {
    save = saveMock;
  }
}

test('#generator seeds mongoose collection', async () => {
  // given
  const collection = [ { test: 1 }, { test: 2 }];

  // when
  spyOn(console, 'log').and.stub();
  await generateCollectionFromModel(ModelMock as any)(collection)();

  // then
  expect(saveMock).toHaveBeenCalledTimes(2);
  expect(console.log).toHaveBeenCalledWith('- ModelMock collection generated');
});
