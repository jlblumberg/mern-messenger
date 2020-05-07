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
    expect(testApp.messages[0].id).to.equal(1);
  });

  it('can get all posts', () => {
    expect(testApp.getAll()).to.be.an('array');
    expect(testApp.getAll().length).to.equal(1);
  });

  it('can read posts', () => {
    expect(testApp.get(1).content).to.equal('Hello, World');
  });

  it('can update posts', () => {
    testApp.update(1, 'Hi, World');
    expect(testApp.messages[0].content).to.equal('Hi, World');
  });

  it('can delete posts', () => {
    testApp.delete(1);
    expect(testApp.messages.length).to.equal(0);
  });

  it("id's are always unique", () => {
    testApp.post('1');
    testApp.post('2');
    testApp.delete(1);
    testApp.post('3');
    expect(testApp.messages[1].id).to.equal(3);
  });

  it("app deletes correctly", () => {
    testApp.post('1');
    testApp.post('2');
    testApp.post('3');
    testApp.delete(0);
    testApp.delete(2);
    expect(testApp.get(1).id).to.equal(1);
  });

  it("app updates correctly", () => {
    testApp.post('1');
    testApp.post('2');
    testApp.delete(1);
    testApp.update(2, 'update');
    expect(testApp.get(2).content).to.equal('update');
  });

  it('writes to a given filepath', () => {
    let testAppFileWrite = new MessageApp('/json/testMessages.json');
    expect(testAppFileWrite.messages.length).to.equal(0);

    testAppFileWrite.post('Hi');
    expect(testAppFileWrite.messages.length).to.equal(1);

    let testAppFileRead = new MessageApp('/json/testMessages.json');
    expect(testAppFileRead.messages.length).to.equal(1);

    testAppFileRead.delete(1)
    let testAppFileCleared = new MessageApp('/json/testMessages.json');
    expect(testAppFileCleared.messages.length).to.equal(0);
  });

});
