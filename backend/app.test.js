import { expect } from 'chai';
import MessageApp from './app.js';

describe('MessageApp', () => {

  let testApp;

  beforeEach(() => {
    testApp = new MessageApp;
  });

  it('has messages', () => {
    expect(testApp.messages).to.be.an('array');
  });

  it('can make a most', () => {
    testApp.post('Hello, World')
    expect(testApp.messages.length).to.equal(1)
  });

  it('posts have content, date, and id', () => {
    testApp.post('Hello, World')
    expect(testApp.messages[0].content).to.equal('Hello, World');
    expect(testApp.messages[0].date).not.to.equal(undefined);
    expect(testApp.messages[0].id).to.equal(0);
  });
});
