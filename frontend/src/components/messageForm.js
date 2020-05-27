import React from 'react'

class MessageForm extends React.Component {
  constructor() {
    super();
    this.formRef = React.createRef();
    this.state = {
      currentMessage: ''
    };
  }

  changeMessageValue(change) {
    this.setState({
      currentMessage: change
    });
  }

  processSubmit(e) {
    e.preventDefault()
    this.props.submitMessage(this.state.currentMessage)
    this.changeMessageValue('')
  }
  
  render() {
    return (
      <div className='container pt-5' style={{ maxWidth: 600 }}>
        <div className='form-group'>
          <form className='form-control border-secondary'
            ref={this.formRef}
            onSubmit={(e) => this.processSubmit(e)}
          >
            Enter a new message
            <textarea className='form-control mb-2'
              onChange={(e) => this.changeMessageValue(e.target.value)}
              value={this.state.currentMessage}
              id='message_box'>
            </textarea>
            <button
              className='btn btn-info'
              type="submit"
              name="Submit"
              id="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageForm;