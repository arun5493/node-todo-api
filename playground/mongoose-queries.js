const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} =  require('./../server/models/todo.js');
const {User} =  require('./../server/models/user.js');

var id = '5998871778e1ba0b818548bb';
if( !ObjectID.isValid(id)) {
  console.log('Invalid ID');
}

var user_id = '59766fbe0b6da8fcaddfb19d';
if( !ObjectID.isValid(user_id)) {
  console.log('Invalid User ID');
}
// Todo.find({
//   _id:id
// }).then((todos) => {
//   console.log('todos', todos);
// });
//
// Todo.findOne({
//   _id : id
// }).then((todo) => {
//   console.log('todo', todo);
// });

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log('ID not found');
  }
  console.log('Todo by Id ', todo);
}).catch((e) => console.log(e));

User.findById(user_id).then((user) => {
  if(!user){
    return console.log('ID not found in User Table');
  }
  console.log('User Details', user);
}).catch((e) => console.log(e));
