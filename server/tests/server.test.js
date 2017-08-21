const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const{app} = require('./../server.js');
const{Todo} = require('./../models/todo.js');

var todos = [{
  _id: new ObjectID(),
  text:'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('GET /todos', () => {
  it('Should get all the Todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('POST /todos', () => {
  it('Should create a todo',(done) => {
      var text = 'Test Todo Note';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=> {
          expect(res.body.text).toBe(text);
        })
        .end((err,res) => {
          if(err){
            return done(err);
          }

          Todo.find({text}).then((todos)=>{
            expect(todos[0].text).toBe(text);
            done();
          }).catch((err) => done(err));
        });
  });

  it('Should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(200)
      .end((err,res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((err)=>done(err));
      })

  });
});

describe('GET /todos/:id', () => {
  it('Should return Todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 if todo not found', (done) => {
    var hexId = (new ObjectID()).toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for invalid ID', (done) => {
    request(app)
      .get('/todos/123123123abc')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id',() => {
  it('Should remove a Todo with given VALID ID', (done) => {
    var hexId = (todos[1]._id).toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res) => {
        if(err){
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should return 404 if Todo not found', (done) => {
    var hexId = (new ObjectID()).toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for invalid ID', (done) => {
    request(app)
      .delete(`/todos/123123123123abc`)
      .expect(404)
      .end(done);
  });
});
