import request from 'supertest'
import { expect } from 'chai';
import MessageApp from '../app.js'

describe('MessageApp Tests', () => {
  let data;
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
        expect(res.body.length).to.equal(1);
        expect(res.body[0].id).to.equal(1);
        expect(res.body[0].content).to.equal('Hi world');
        done();
      });
  }); 

  it("gets a single message", done => {
    const res = request(MessageApp)
      .get("/message/1")
    res.expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        };
        expect(res.body[0].content).to.equal('Hi world');
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
        expect(res.body.length).to.equal(1);
        expect(res.body[0].id).to.equal(1);
        expect(res.body[0].content).to.equal('Hi world');
        done();
      });
  });

  it('updates a message', done => {
    data = {
      content: 'Hello World'
    }
    const res = request(MessageApp)
      .put('/update/1')
      .send(data)
      .set('Accept', 'application/json');
    res.expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        };
        expect(res.body[0].content).to.equal('Hello World');
        done();
      });
  });

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