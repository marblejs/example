import { from } from 'rxjs';
import { Actor } from './actor.model';
import { applyCollectionQuery, CollectionQuery } from '../../common/helpers/collectionQuery.helper';

export const SORTING_FIELDS = ['_id', 'name', 'country', 'gender'];

export namespace ActorDao {
  export const model = new Actor().getModelForClass(Actor);

  export const findAll = (query: CollectionQuery) => from(
    applyCollectionQuery(query)(model.find()).exec()
  );

  export const findById = (id: string) => from(
    model.findById(id).exec()
  );

  export const findOneByImdbID = (imdbId: string) => from(
    model.findOne({ imdbId }).exec()
  );
}
