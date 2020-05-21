import React from 'react';
import ReactDOM from 'react-dom';
import MessageApp from '../App';
import mockAxios from '../__mocks__/axios.js'
import errorMock from '../__mocks__/error.json'
import mockMessages from '../__mocks__/messages.json'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  beforeEach(function () {
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: [] }))
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: mockMessages }))
    mockAxios.delete.mockImplementation(() =>
      Promise.resolve({ data: [] }))
  })

  afterEach(function () {
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
    mockAxios.delete.mockClear()
  })

  it('renders correctly', () => {
    const component = mount(<MessageApp />);
    expect(component).toMatchSnapshot();
  });

  it('has a text box', () => {
    const component = mount(<MessageApp />);
    expect(component.exists('textarea#message_box')).toBe(true);
  });

  it('has a submit button', () => {
    const component = mount(<MessageApp />);
    expect(component.exists('button#submit')).toBe(true);
  });

  it('has a message list', () => {
    const component = mount(<MessageApp />);
    expect(component.exists('ul#message_list')).toBe(true);
  });

  it('posts data and clears message box on submit', () => {
    const component = mount(<MessageApp />);
    component.find('textarea#message_box').simulate('change', { target: { value: 'Hello'} } );
    component.find('form').simulate('submit');
    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3000/message", { "content": "Hello" } );
    expect(component.instance().messageFormRef.current.state.currentMessage).toEqual('');
  });

  it('loads data from API', () => {
    mount(<MessageApp />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  });

  it('removes message on delete', async () => {
    const component = await mount(<MessageApp />);
    await component.update()
    await component.find('ul#message_list').childAt(0).find('#delete').simulate('click');
    await component.update()
    expect(mockAxios.delete).toHaveBeenCalledWith("http://localhost:3000/delete/1", { "id": 1 })
    // expect(component.find('ul#message_list').children().length).toBe(4);
  });

})

describe('App', () => {

  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.reject({ data: errorMock }));
    mockAxios.get.mockImplementation(() =>
      Promise.reject({ data: errorMock }));
  });

  afterEach(() => {
    mockAxios.post.mockClear();
    mockAxios.get.mockClear();
  });

  it('loads err on GET err', async () => {
    const component = await mount(<MessageApp />);
    await component.update();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(component.state().error).toEqual({ data: "error text for mock" });
    expect(component.find('#error').text()).toBe('Error: error text for mock');
  });

  it('loads err on POST err', async () => {
    const component = mount(<MessageApp />);
    component.find('textarea#message_box').simulate('change', { target: { value: 'bad string' } });
    await component.find('form').simulate('submit');
    await component.update();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(component.state().error).toEqual({ data: "error text for mock" });
    expect(component.find('#error').text()).toBe('Error: error text for mock');
  });
  
});