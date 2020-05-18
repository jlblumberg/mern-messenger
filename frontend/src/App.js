import React, { Component } from 'react';
import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import axios from 'axios';
const PORT = 'http://localhost:3000';

class MessageApp extends React.Component {

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    });
  }

  render() {
    return(
      <div className='App'>
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
