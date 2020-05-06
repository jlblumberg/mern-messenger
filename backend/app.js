class MessageApp {
  constructor() {
    this.messages = [];
  };

  // C in CRUD
  post(content) {
    let item = {
      id: newId(this.messages),
      content: content,
      date: new Date()
    };
    this.messages.push(item);
    return this.messages;
  };

  // R
  get(id) {
    return this.messages.filter(message => message.id === id)[0];
  };

  // U
  update(id, updatedContent) {
    let index = this.messages.findIndex(message => message.id === id);
    this.messages[index].content = updatedContent;
  };

  // D
  delete(id) {
    this.messages = this.messages.filter(message => message.id != id)
    return this.messages
  };

};

const newId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1
  };
};

export default MessageApp