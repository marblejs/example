import { from } from 'rxjs';
import { Actor } from './actor.model';

export namespace ActorDao {
  export const model = new Actor().getModelForClass(Actor);

  export const findAll = () => from(
    model.find().exec()
  );

  export const findById = (id: string) => from(
    model.findById(id).exec()
  );

  export const findByImdbID = (imdbId: string) => from(
    model.find({ imdbId }).exec()
  );
}
