import request from 'supertest'
import mongoose from "mongoose"
import { expect } from 'chai';
import MessageApp from '../app.js'
let data;
let id;

describe("message API endpoint tests", function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/testMessages', { useNewUrlParser: true, useFindAndModify: false }, function () {
      mongoose.connection.db.dropDatabase(function () {
        done()
      })
    })
  })

  it('posts a message', (done) => {
    data = {
      content: 'Hi world'
    };
    const res = request(MessageApp)
      .post('/message')
      .send(data)
      .set('Accept', 'application/json');
    res.expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        };
        expect(res.body.content).to.equal('Hi world');
        done();
      });
  }); 

  it('gets all messages', (done) => {
    const res = request(MessageApp).get('/');
    res.expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        };
        // id = res.body[0]._id;
        expect(res.body.length).to.equal(1);
        expect(res.body[0].content).to.equal('Hi world');
        done();
      });
  });

  it('gets a single message', (done) => {
    const res = request(MessageApp).get('/message/1')
    res.expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).to.equal(1)
        done()
      })
  })

  it('updates a message', (done) => {
    data = {
      content: 'Hello World'
    }
    const res = request(MessageApp)
      .put('/update/1')
      .send(data)
      .set('Accept', 'application/json')
    res.expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body[0].content).to.equal('Hello World')
        done()
      })
  })

  it('deletes a message', (done) => {
      const res = request(MessageApp)
        .delete('/delete/1')
        .set('Accept', 'application/json');
      res.expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          };
          expect(res.body.length).to.equal(0);
          done();
        });
    });
});

describe("message api errors correctly", () => {
  let data;
  it('posts a message errors', done => {
    data = {
      content: ""
    };
    const res = request(MessageApp)
      .post('/message')
      .send(data)
      .set('Accept', 'application/json')
    res.expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body).to.equal("You can't post an empty message")
        done()
      })
  })

  it('gets all errors when no messages', done => {
    const res = request(MessageApp)
      .get('/')
    res.expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body).to.equal('No messages in database')
        done()
      })
  })

  it('errors if cant find single message', done => {
    const res = request(MessageApp)
      .get('/message/1')
    res.expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body).to.equal('No messages in database')
        done()
      })
  })

  it('errors on bad update', done => {
    data = {
      content: 'Hello World'
    }
    const res = request(MessageApp)
      .put('/update/0')
      .send(data)
      .set('Accept', 'application/json')
    res.expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body).to.equal('You can\'t post an empty message')
        done()
      })
  })

  it("errors deleting message that doesn't exist", done => {
    data = {
      id: 0
    };
    const res = request(MessageApp)
      .delete('/delete/0')
      .send(data)
      .set('Accept', 'application/json')
    res.expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body).to.equal('Message not found in database')
        done()
      })
  })
})