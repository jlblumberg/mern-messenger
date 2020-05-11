let messageApp;

if (process.env.npm_lifecycle_event == "test") {
  messageApp = new MessageApp('/json/testMessages.json');
} else {
  messageApp = new MessageApp('/json/messages.json');
};

import MessageApp from './model.js';

function getAll() {
  return new Promise((resolve, reject) => {
    let result = messageApp.getAll();
    if (result !== []) {
      resolve(result);
    } else {
      reject(result);
    };
  });
};

module.exports = {
  getAll
}