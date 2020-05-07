import fs from 'fs';

class MessageApp {
  constructor(filepath) {
    this.filepath = filepath;
    this.messages = filepath ? this.readFromJson() : [];
  };

  readFromJson() {
    return JSON.parse(fs.readFileSync(
      __dirname + this.filepath, "utf8", (err, data) => {
      if (err) throw err
      })
    );
  };

  writeToJson() {
    if (this.filepath) {
      const jsonItem = JSON.stringify(this.messages)
      fs.writeFileSync(__dirname + this.filepath, jsonItem, (err) => {
        if (err) throw err;
      });
    };
  };

  // C in CRUD
  post(content) {
    if (content) {
      this.messages.push({
        content: content,
        date: new Date(),
        id: newId(this.messages)
      });
      this.writeToJson();
      return this.messages;
    } else if (!content) {
      return [];
    };
  };

  // R
  get(id) {
    return this.messages.filter(message => message.id === id)[0];
  };

  getAll() {
    return this.messages
  };

  // U
  update(id, updatedContent) {
    let index = this.messages.findIndex(message => message.id === id);
    if (index >= 0) {
      this.messages[index].content = updatedContent;
      this.writeToJson();
      return this.messages;
    } else {
      return [];
    };
  };

  // D
  delete(id) {
    let index = this.messages.findIndex(message => message.id == id);
    if (index >= 0) {
      this.messages.splice(index, 1);
      this.writeToJson();
      return this.messages;
    } else {
      return "Message not found in database";
    };
  };

};

const newId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  };
};

export default MessageApp