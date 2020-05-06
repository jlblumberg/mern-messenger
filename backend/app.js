class MessageApp {
  constructor() {
    this.messages = [];
  };

  // C in CRUD
  post(content) {
    let item = {
      id: this.messages.length,
      content: content,
      date: new Date()
    };
    this.messages.push(item);
    return this.messages;
  };

  // R
  get(id) {
    return this.messages[id];
  };

  // U
  update(id, updatedContent) {
    this.messages[id].content = updatedContent;
    return this.messages[id];
  };

  // D
  delete(id) {
    this.messages.splice(id - 1, 1);
    return this.messages;
  };

};

export default MessageApp