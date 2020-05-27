import React from 'react';
import MessageList from '../components/messageList';
import mockMessages from '../__mocks__/messages.json' 
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('List', () => {
  it('renders correctly', () => {
    const component = mount(<MessageList />);
    expect(component).toMatchSnapshot();
  });

  it('takes messages as props and displays them', () => {
    const component = shallow(<MessageList 
      messages={mockMessages}
    />);
    expect(component.find('div#message_list').length).toBe(1);
  });

  it('has a delete button for each message', () => {
    const component = mount(<MessageList
      messages={mockMessages}
    />);
    expect(component.find('div#message_list').childAt(0).exists('button#delete')).toBe(true);
  });

  it('has an update button for each message', () => {
    const component = shallow(<MessageList
      messages={mockMessages}
      loaded={true}
    />);
    expect(component.find('div#message_list').childAt(0).find('#update').text()).toBe('update');
  });

  it('clicking update toggles edit mode', () => {
    const component = mount(<MessageList
      messages={mockMessages}
      loaded={true}
    />)
    component.find('div#message_list').childAt(0).find('#update').simulate('click');
    expect(component.find('#updateBox').text()).toBe('Hello')
    expect(component.find('#send').text()).toBe('Send Update')
  });
  
})