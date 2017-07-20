// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log('Unable to connect to Db');
  }
  console.log('Successfully connected to MongoDb');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectId('59711d792875bbfa199bcb20')
  // },{
  //   $set:{
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId('59695a4491d53a34a9ff1de3')
  }, {
    $set: {
      name: 'Arun'
    },
    $inc: {
      age: 5
    }
  },{
    returnOriginal:false
  }).then((result) => {
    console.log(result);
  });
  // db.close();
});
