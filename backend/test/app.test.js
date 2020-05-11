import request from 'supertest';
import { expect } from 'chai';
const MessageApp = require('../app.js');

describe('Message API', () => {
  it.only('gets info from backend messages', (done) => {
    const res = request(MessageApp).get('/');

    res.expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.length).to.equal(1);
      done();
    })
  });
});