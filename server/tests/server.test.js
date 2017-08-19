const expect = require('expect');
const request = require('supertest');

const{app} = require('./../server.js');
const{Todo} = require('./../models/todo.js');


beforeEach((done) => {
  Todo.remove({}).then(() => done());
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

          Todo.find().then((todos)=>{
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
          expect(todos.length).toBe(0);
          done();
        }).catch((err)=>done(err));
      })

  })

});
