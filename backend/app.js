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

  // R in CRUD
  get(id) {
    return this.messages[id];
  };
  
};

export default MessageApp