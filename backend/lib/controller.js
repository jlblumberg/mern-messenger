import MessageModel from './model';

function getAll() {
  return MessageModel.find()
};

function post(content) {
  let newMessage = new MessageModel({ content: content })
  return newMessage.save()
};

function deleteMessage(id) {
  return MessageModel.deleteOne({ _id: id })
}

function getSingleMessage(id) {
  return MessageModel.findOne({ _id: id })
}

function updateMessage(id, content) {
  return MessageModel.findOneAndUpdate({ _id: id }, { content: content }, { new: true })
}

module.exports = {
  getAll,
  getSingleMessage,
  post,
  deleteMessage,
  updateMessage
}