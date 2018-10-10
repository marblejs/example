import { from } from 'rxjs';
import { Movie } from './movie.model';
import { applyCollectionQuery, CollectionQuery } from '../../common/helpers/collectionQuery.helper';

export const SORTING_FIELDS = ['title', 'director', 'year', 'metascore'];

export namespace MovieDao {
  export const model = new Movie().getModelForClass(Movie);

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
