import { Document } from 'mongodb';
import handler from '../../lib/logger';
import dbService from './connection';

async function getData(collectionName: string, query: Document[]) {
  try {
    const { db } = dbService
    const agregateResult = await db.collection(collectionName).aggregate(query);
    const data = await agregateResult.toArray();
    return data;
  } catch (error: any) {
    throw handler.handlerError(2101, 'there was an error in the query', 409);
  }
}

export default getData;
