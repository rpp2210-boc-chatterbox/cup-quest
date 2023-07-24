/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import ChatFooter from '../src/pages/ChatFooter';

const mockSocket = {};
const mockCurrentUser = { name: 'John' };
const mockCurrentChat = 'user2';

describe('ChatFooter component', () => {
  it('renders without crashing', () => {
    shallow(<ChatFooter socket={mockSocket} currentUser={mockCurrentUser} currentChat={mockCurrentChat} />);
  });

  it('updates the input value when typing', () => {
    const wrapper = shallow(<ChatFooter socket={mockSocket} currentUser={mockCurrentUser} currentChat={mockCurrentChat} />);
    const input = wrapper.find('input');

    const mockText = 'Hello, this is a test message!';
    input.simulate('change', { target: { value: mockText } });

    expect(wrapper.find('input').prop('value')).toEqual(mockText);
  });

  it('calls handleSubmit when the form is submitted', () => {
    const mockPreventDefault = jest.fn();
    const wrapper = shallow(<ChatFooter socket={mockSocket} currentUser={mockCurrentUser} currentChat={mockCurrentChat} />);
    const form = wrapper.find('form');

    const mockText = 'Hello, this is a test message!';
    wrapper.find('input').simulate('change', { target: { value: mockText } });

    form.simulate('submit', { preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  });
});
