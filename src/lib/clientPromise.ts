//write clientPromise here written in typescript so i can connect to my mongodb database

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error(error);
});

export default client;