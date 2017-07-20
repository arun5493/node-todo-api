// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log('Unable to connect to Db');
  }
  console.log('Successfully connected to MongoDb');

  // Delete Many
  // db.collection('Todos').deleteMany({text:'run'}).then( (result) => {
  //   console.log(result);
  // });

  // Delete One
  // db.collection('Todos').deleteOne({text:'Something to do'}).then((result)=> {
  //   console.log(result);
  // });


  // findOneAndDelete = Pop method in stack
  // db.collection('Todos').findOneAndDelete({completed: true}).then((result) =>{
  //   console.log(result);
  // });


  // Exercise
  // 
  // db.collection('Users').deleteMany({name:"Arun"}).then((result) => {
  //   console.log(result);
  // });
  //
  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectId('59695e8aa5cb113550c804ad')
  // }).then((result) => {
  //   console.log(result);
  // });
  // db.close();
});
