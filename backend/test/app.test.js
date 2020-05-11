import request from 'supertest';
import { expect } from 'chai';
import MessageApp from '../app.js';

describe('Hello world test', () => {
  it('first test', (done) => {
    const res = request(MessageApp).get('/');

    res.expect({ val: 'Hello, World.' });
    res.expect(200, done);
  });
});