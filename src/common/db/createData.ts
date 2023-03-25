import { Document } from 'mongodb';
import handler from '../../lib/logger';
import dbService from './connection';

async function createData(collectionName: string, data: Document) {
  try {
    const { db } = dbService
    const savedInformation = await db.collection(collectionName).insertOne({
      ...data, 
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    });
    return savedInformation;
  } catch (error: any) {
    throw handler.handlerError(2100, 'there was an error creating data', 409);
  }
}

export default createData;
