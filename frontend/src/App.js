import React from 'react';
import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import './App.css';

class MessageApp extends React.Component {
  render() {
    return(
      <div className='App'>
        <MessageForm/>
        <MessageList/>
      </div>
    );
  }
}

export default MessageApp;
