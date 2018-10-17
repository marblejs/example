import { Document, DocumentQuery } from 'mongoose';

export interface CollectionQueryOptions extends Record<string, any> {
  sortBy: string;
  sortDir: SortDir;
  limit: number;
  page: number;
}

export interface CollectionQueryResult<T> {
  collection: T;
  total: number;
}

export enum SortDir {
  ASC = 1,
  DESC = -1,
}

export const applyCollectionQuery = (queryOptions: CollectionQueryOptions) =>
  async <T, U extends Document>(dbQuery: () => DocumentQuery<T, U>): Promise<CollectionQueryResult<T>> => {
    const totalQuery = dbQuery().estimatedDocumentCount();

    const collectionQuery = dbQuery()
      .limit(queryOptions.limit)
      .skip((queryOptions.page - 1) * queryOptions.limit)
      .sort({ [queryOptions.sortBy]: queryOptions.sortDir });

    const [total, collection] = [await totalQuery, await collectionQuery];

    return { collection, total };
  };
