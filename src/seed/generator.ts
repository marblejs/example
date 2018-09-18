import { Typegoose } from 'typegoose';

interface TypegooseModel {
  new(): Typegoose;
}

export const generateCollectionFromModel = <T extends TypegooseModel>(model: T) => (collection: any[]) =>
  async () => {
    const modelInstance = new model();
    const mongooseModel = modelInstance.getModelForClass(model);

    await Promise.all(collection.map(item => new mongooseModel(item).save()));
    console.log(`- ${modelInstance.constructor.name} collection generated`);
  };
