import React, { Component } from 'react';
import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import ErrorHandler from './components/errorHandler';
import axios from 'axios';
const PORT = 'http://localhost:3000';

class MessageApp extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
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
    this.getAllMessages();
  }

  getAllMessages = () => {
    axios.get(`${PORT}/`)
    .then((result) => {
      this.setMessages(result.data)
    })
    .catch((err) => {
      this.setError(err)
    })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
    .then(() => {
      this.getAllMessages()
    })
    .catch((err) => {
      this.setError(err)
    })
  }

  render() {
    return(
      <div className='App'>
        <ErrorHandler
          error={this.state.error}
        />
        <MessageForm
          ref='messageFormRef'
          submitMessage={this.submitMessage}
        />
        <MessageList/>
      </div>
    );
  }
}

export default MessageApp;
