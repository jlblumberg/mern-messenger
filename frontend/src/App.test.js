import React from 'React';
import ReactDOM from 'react-dom';
import MessageApp from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  const component = mount(<MessageApp />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('has a text box', () => {
    expect(component.exists('textarea#message_box')).toBe(true);
  });

  it('has a submit button', () => {
    expect(component.exists('button#submit')).toBe(true);
  });

  it('has a message list', () => {
    expect(component.exists('ul#message_list')).toBe(true);
  });

})