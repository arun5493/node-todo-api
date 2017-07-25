var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();

app.use(bodyParser.json());


app.post('/todos',(req,res) => {

  var newTodo = new Todo({
      text:req.body.text
  });

  newTodo.save().then((doc) =>{
    res.send(doc);
  },(err) => {
    res.send(err);
  });
  
});



app.listen(3000, () => {
  console.log('Started app on port 3000');
});
