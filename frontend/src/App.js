import React from 'react';

function MessageApp() {
  return(
    <div className='App'>
      <textarea id='message_box'></textarea>
      <br/>
      <button type='submit' name='submit' id='submit'>Submit</button>
    </div>
  );
}

export default MessageApp;
