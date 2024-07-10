const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; //mongosh server path//

const client = new MongoClient(uri);

const data1={
    fruit:'Butter Fruit',
    size:'Large',
    color:'Green'
} //new data//

const main = async () => {
  try {
    await client.connect(); //connecting to server//
    const db = client.db('shop'); //connecting to database//
    const collection = db.collection('product'); //navigating to collection//
    await collection.insertOne(data1);
    const data = await collection.find({ color: 'Red' }).toArray(); //query writting//
    console.log(data);
    return 'done';
  } catch (e) {
    console.log(e);
  } finally {
    await client.close(); //server colsing//
  }
};

main().then(console.log).catch((e) => console.log(e));
