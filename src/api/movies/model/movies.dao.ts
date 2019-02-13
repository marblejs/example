import { from } from 'rxjs';
import { Movie } from './movies.model';
import { applyCollectionQuery, CollectionQueryOptions } from '../../common/helpers/collectionQuery.helper';

export const SORTING_FIELDS = ['_id', 'title', 'director', 'year', 'metascore'];

export namespace MoviesDao {
  export const model = new Movie().getModelForClass(Movie);

  export const findAll = (query: CollectionQueryOptions) => from(
    applyCollectionQuery(query)(() => model.find())
  );

  export const findById = (id: string) => from(
    model.findById(id).exec()
  );

  export const findOneByImdbID = (imdbId: string) => from(
    model.findOne({ imdbId }).exec()
  );
}
