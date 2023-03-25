/* eslint-disable max-len */
import { Document, FindOneAndUpdateOptions } from 'mongodb';
import handler from '../../lib/logger';
import dbService from './connection';

async function updateData(collectionName: string, query: Document, set: Document, options: FindOneAndUpdateOptions) {
  try {
    const optionstoupdate = {
      returnNewDocument: 'after',
      ...options,
    };
    // eslint-disable-next-line no-underscore-dangle
    const { db } = dbService;
    const dataToSet = {
      $set:{
        ...set,
        updatedAt: new Date(Date.now()),
      }
    }
    const updatedData = await db.collection(collectionName).findOneAndUpdate(query, dataToSet, optionstoupdate);
    const data = updatedData.value;
    // close connection
    return data;
  } catch (error: any) {
    throw handler.handlerError(2102, 'there was an error in the update', 409);
  }
}
export default updateData;
