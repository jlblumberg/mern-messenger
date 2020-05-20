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
    expect(component.find('ul#message_list').length).toBe(1);
  });

  it('has a delete button for each message', () => {
    const component = mount(<MessageList
      messages={mockMessages}
    />);
    expect(component.find('ul#message_list').childAt(0).exists('button#delete')).toBe(true);
  });
})