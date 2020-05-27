import React, {Component} from 'react';

class MessageList extends Component {

  constructor() {
    super()
    this.state = {
      editMode: {
        id: null,
        content: null
      }
    }
  }

  toggleUpdate(message) {
    this.setState({
      editMode: {
        id: message._id,
        content: message.content
      }
    })
  }

  sendUpdate() {
    this.props.sendUpdate(this.state.editMode.id, this.refs.updateBox.value)
    this.toggleUpdate({ id: null, content: null })
  }

  formatMessage(message) {
    let content = message.content
    let updateButton = <button className='btn btn-info'
      onClick={() => this.toggleUpdate(message)}
      id='update'>
      update
    </button>

    if (message._id === this.state.editMode.id) {
      content = (<textarea
        onChange={(e) => this.setState({
          editMode: {
            id: message._id,
            content: e.target.value
          }
        }
        )}
        value={this.state.editMode.content}
        ref='updateBox'
        id='updateBox'
      >
      </textarea>)

      updateButton = (<button className='btn btn-info'
        onClick={() => this.sendUpdate(message)}
        id='send'>
        Send Update
      </button>)
    }

    return <div className='post card mb-3 border-secondary'>
      <div className='card-body' key={message._id}>
        <div className='card-title'>
          {content}
        </div>
        <br/>
        <div className='card-subtitle mb-2 text-muted'>
          {new Date(message.date).toLocaleTimeString('en-UK')}
          <br/>
          {new Date(message.date).toLocaleDateString('en-UK')}
          <br/>
        </div>
        <button
          id='delete'
          className='btn btn-info'
          onClick={() => this.props.handleDelete(message._id)}>
          delete
        </button>
        {updateButton}
      </div>
    </div>
  }

  render() {
    if (!this.props.messages) {
      return <ul id='message_list'>no messages</ul>
    }
    if (this.props.messages) {
      return (
        <div className='container pt-3' style={{maxWidth: 600}}>
          <div id='message_list'>
            {this.props.messages.reverse().map(message => {
              return this.formatMessage(message)
            })}
          </div>
        </div>
      )
    }
  }
}

export default MessageList;