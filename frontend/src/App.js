import React, { Component } from 'react';
import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import ErrorHandler from './components/errorHandler';
import axios from 'axios';
const URL = 'http://localhost:5000';

class MessageApp extends Component {
  constructor() {
    super()
    this.messageFormRef = React.createRef();
    this.state = {
      messages: []
    }
  }

  setError(error) {
    this.setState({
      error: error
    })
  }

  setMessages(messages) {
    this.setState({
      messages: messages
    })
  }

  componentDidMount() {
    this.getAllMessages()
  }

  getAllMessages = () => {
    axios.get(`${URL}/`)
      .then((result) => {
        this.setMessages(result.data)
      })
      .catch((err) => {
        this.setError(err)
      })
  }

  submitMessage = (data) => {
    axios.post(`${URL}/message`, {
      content: data
    })
      .then(() => {
        this.getAllMessages()
      })
      .catch((err) => {
        this.setError(err)
      })
  }

  deleteMessage = (id) => {
    axios.delete(`${URL}/delete/${id}`, {
      id: id
    })
      .then((result) => {
        this.getAllMessages()
      })
      .catch((err) => {
        this.setError(err);
      })
  }

  sendUpdate = (id, content) => {
    axios.put(`${URL}/update/${id}`, {
      content: content
    })
      .then((result) => {
        this.getAllMessages()
      })
      .catch((err) => {
        this.setError(err);
      })
  }

  render() {
    return (
      <div>
        <ErrorHandler
          error={this.state.error}
        />
        <MessageForm
          ref={this.messageFormRef}
          submitMessage={this.submitMessage}
        />
        <MessageList
          messages={this.state.messages}
          handleDelete={this.deleteMessage}
          sendUpdate={this.sendUpdate}
        />
      </div>
    );
  }
}

export default MessageApp;
