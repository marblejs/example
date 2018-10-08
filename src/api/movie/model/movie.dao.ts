import { from } from 'rxjs';
import { Movie } from './movie.model';

export namespace MovieDao {
  export const model = new Movie().getModelForClass(Movie);

  export const findAll = () => from(
    model.find().exec()
  );

  export const findById = (id: string) => from(
    model.findById(id).exec()
  );

  export const findOneByImdbID = (imdbId: string) => from(
    model.findOne({ imdbId }).exec()
  );
}
