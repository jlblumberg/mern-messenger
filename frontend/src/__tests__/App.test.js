import React from 'react';
import ReactDOM from 'react-dom';
import MessageApp from '../App';
import mockAxios from '../__mocks__/axios.js'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  const component = mount(<MessageApp />);

  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: [] }));
  });

  afterEach(() => {
    mockAxios.post.mockClear();
    mockAxios.get.mockClear()
  });

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

  it('posts data and clears message box on submit', () => {
    component.find('textarea#message_box').simulate('change', { target: { value: 'Hello'} } );
    component.find('form').simulate('submit');
    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3000/message", { "content": "Hello" } );
    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('');
  });

  it('loads data from API', () => {
    mount(<MessageApp />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  });

})