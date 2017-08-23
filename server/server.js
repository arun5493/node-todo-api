// cd ~/mongo/bin/
// ./mongod --dbpath ~/mongo-data

require('./config/config.js');

var {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
const _=require('lodash');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();
const port = process.env.PORT; // || 3000;No need this as we took care of this in first if-else block

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

app.get('/todos', (req,res)  => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) =>{
    res.status(400).send(e);
  });
});

// GET /todos/123123123
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send({message:'Sorry.Invalid ID'});
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send({message:'Not available'});
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send({message:'Sorry, Invalid ID'});
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send({message:"Todo not found with the given ID"});
    }
    return res.send({todo}).status(200);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send({message:'Sorry, Invalid ID'});
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else{
    body.completed =  false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body},{new:true}).then((todo) => {
    if(!todo){
      return res.status(404).send({message:"Todo not found with the given ID"});
    }
    res.send({todo}).status(200);
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Started app on port ${port}`);
});



module.exports = {app};
