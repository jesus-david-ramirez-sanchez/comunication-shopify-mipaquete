import { Document } from 'mongodb';
import handler from '../../lib/logger';
import dbService from './connection';

async function findOne(
    collectionName: string,
    filter: {} | Document,
    projection: {} | Document,
    sort: {} | Document,
  ) {
    try {
      const { db } = dbService;
      const document = await db.collection(collectionName).findOne(filter, { projection, sort });
      const data = document;
      return data;
    } catch (error) {
      throw handler.handlerError(519, 'there was an error in the query to get a single document', 400);
    }
  }

  export default findOne;