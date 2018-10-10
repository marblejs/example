import { Document, DocumentQuery } from 'mongoose';

export interface CollectionQuery extends Record<string, any> {
  sortBy: string;
  sortDir: SortDir;
  limit: number;
  page: number;
}

export enum SortDir {
  ASC = 1,
  DESC = -1,
}

export const applyCollectionQuery = (query: CollectionQuery) => <T, U extends Document>(doc: DocumentQuery<T, U>) =>
  doc.limit(query.limit)
    .skip((query.page - 1) * query.limit)
    .sort({ [query.sortBy]: query.sortDir });
