import { validator$, Joi } from '@marblejs/middleware-joi';
import { SortDir } from '../helpers/collectionQuery.helper';

export interface CollectionQueryValidatorOpts {
  sortBy: string[];
}

export const collectionQueryValidator$ = (opts: CollectionQueryValidatorOpts) => validator$({
  query: Joi.object({
    sortBy: Joi.string().valid(opts.sortBy).default('_id'),
    sortDir: Joi.number().valid(SortDir.DESC, SortDir.ASC).default(SortDir.ASC),
    limit: Joi.number().min(0),
    page: Joi.number().min(1),
  })
});
