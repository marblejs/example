import { Document, DocumentQuery } from 'mongoose';
import { CollectionQuery } from '../validators/collectionQuery.validator';

export interface CollectionQueryResult<T> {
  collection: T;
  total: number;
}

export enum SortDir {
  ASC = '1',
  DESC = '-1',
}

export const applyCollectionQuery = ({
  limit = 0,
  page = 1,
  sortBy = '_id',
  sortDir = SortDir.ASC,
}: CollectionQuery) =>
  async <T, U extends Document>(dbQuery: () => DocumentQuery<T, U>): Promise<CollectionQueryResult<T>> => {
    const totalQuery = dbQuery().estimatedDocumentCount();
    const collectionQuery = dbQuery()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ [sortBy]: sortDir });
    const [total, collection] = [await totalQuery, await collectionQuery];

    return { collection, total };
  };
