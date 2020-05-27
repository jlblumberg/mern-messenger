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
          <form
            ref={this.formRef}
            onSubmit={(e) => this.processSubmit(e)}
          >
            <h5>Enter a new message</h5>
            <textarea className='form-control mt-2 mb-2'
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