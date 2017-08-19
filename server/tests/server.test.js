const expect = require('expect');
const request = require('supertest');

const{app} = require('./../server.js');
const{Todo} = require('./../models/todo.js');

const todos = [{
  text:'First test todo'
}, {
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
