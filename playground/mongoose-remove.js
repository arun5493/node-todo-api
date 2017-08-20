const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} =  require('./../server/models/todo.js');
const {User} =  require('./../server/models/user.js');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({_id:''}).then((result) => {
//   console.log(result);
// });
//
Todo.findByIdAndRemove('599a0577e64d613970cd3aea').then((todo) => {
  console.log(todo);
});
