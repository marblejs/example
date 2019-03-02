import { requestValidator$, t } from '@marblejs/middleware-io';
import { SortDir } from '../helpers';

type CollectionQueryValidatorOpts = {
  sortBy: string[];
};

const createQuery =  (opts: CollectionQueryValidatorOpts) => t.partial({
  sortBy: t.union(
    opts.sortBy.map(s => t.literal(s)) as any
  ),
  sortDir: t.union([
    t.literal(SortDir.ASC),
    t.literal(SortDir.DESC),
  ]),
  limit: t.refinement(t.union([t.string, t.number]), n => Number(n) >= 0, 'number.0+'),
  page: t.refinement(t.union([t.string, t.number]), n => Number(n) >= 1, 'number.1+'),
});

export const collectionQueryValidator$ = (opts: CollectionQueryValidatorOpts) =>
  requestValidator$({ query: createQuery(opts) });

export type CollectionQuery = t.TypeOf<ReturnType<typeof createQuery>>;
