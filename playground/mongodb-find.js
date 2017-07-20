// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log('Unable to connect to Db');
  }
  console.log('Successfully connected to MongoDb');

  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch from Todos ',err);
  // });

  // db.collection('Todos').find({completed:false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch from Todos ',err);
  // });

  // db.collection('Todos').find({
  //   _id: new ObjectId('596959a31a3d6e346c48fef6')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch from Todos ',err);
  // });

  // db.collection('Todos').find({}).count().then((count) => {
  //   console.log(`Todos : ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch from Todos ',err);
  // });

  db.collection('Users').find({
    name: 'Arun Jaganathan'
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
  }, (err) => {
    console.log('Unable to fetch from Users ',err);
  });

  //db.close();
});
