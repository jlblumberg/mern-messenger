import { expect } from 'chai';
import MessageApp from './app.js';

describe('MessageApp', () => {

  let testApp;

  beforeEach(() => {
    testApp = new MessageApp;
    testApp.post('Hello, World');
  });

  it('has messages', () => {
    expect(testApp.messages).to.be.an('array');
  });

  it('can make a post', () => {
    testApp.post('Hello, World, Again');
    expect(testApp.messages.length).to.equal(2);
  });

  it('posts have content, date, and id', () => {
    expect(testApp.messages[0].content).to.equal('Hello, World');
    expect(testApp.messages[0].date).not.to.equal(undefined);
    expect(testApp.messages[0].id).to.equal(0);
  });

  it('can read posts', () => {
    expect(testApp.get(0).content).to.equal('Hello, World');
  });

  it('can update posts', () => {
    testApp.update(0, 'Hi, World');
    expect(testApp.messages[0].content).to.equal('Hi, World');
  });

  it('can delete posts', () => {
    testApp.delete(0);
    expect(testApp.messages.length).to.equal(0);
  });

});
