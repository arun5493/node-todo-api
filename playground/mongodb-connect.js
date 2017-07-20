// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log('Unable to connect to Db');
  }
  console.log('Successfully connected to MongoDb');

  // db.collection('Todos').insertOne({
  //     text:"Something to do",
  //     completed:false
 /     if(err){
  //       return console.log("Unable to insertOne record",err);
  //     }
  //
  //     console.log(JSON.stringify(result.ops,undefined,2));
  // });

  db.collection('Users').insertOne({
      name:'Arun Jaganathan',
      age:23,
      location:'Raleigh'
  }, (err,result) =>{
      if(err){
        return console.log("Unable to insertOne record",err);
      }

      // console.log(JSON.stringify(result.ops._id.getTimestamp(),undefined,2));
      console.log(result.ops[0]._id.getTimestamp());
  });


  db.close();
});
