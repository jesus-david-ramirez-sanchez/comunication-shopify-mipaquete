import { Db } from "mongodb";

import logger from '../../startup/logging';
const { connectionDB } = process.env;
const  MongoClient  = require('mongodb').MongoClient;
const{ Db } = require('mongodb').Db
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  maxPoolSize: 30,
};


const dbService : { db: Db, connect: (callback: any) => void  }= {
  db: Db,
  connect: (callback: any) => {
    MongoClient.connect(connectionDB, options, (err: any, database: typeof MongoClient) => {
      if (err) {
        callback(err);
      }
      dbService.db = database.db('mipaqueteEcommerce');
      logger.info('Successfully connected to the database');
      callback(null);
    });
  },
};

export default dbService;
