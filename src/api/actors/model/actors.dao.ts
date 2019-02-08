import { applyCollectionQuery, CollectionQuery } from '@api/common';
import { from } from 'rxjs';
import { Actor } from './actors.model';

export const SORTING_FIELDS = ['_id', 'name', 'country', 'gender'];

export namespace ActorsDao {
  export const model = new Actor().getModelForClass(Actor);

  export const findAll = (query: CollectionQuery) => from(
    applyCollectionQuery(query)(() => model.find())
  );

  export const findById = (id: string) => from(
    model.findById(id).exec()
  );

  export const findOneByImdbID = (imdbId: string) => from(
    model.findOne({ imdbId }).exec()
  );
}
