/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import ChatBody from '../src/pages/ChatBody';
import ChatMessage from '../src/pages/ChatMessage';

const mockSocket = {};
const mockMessages = [
  { id: 1, text: 'Hello!', user: 'user1' },
  { id: 2, text: 'Hi there!', user: 'user2' },
];
const mockCurrentUser = 'user1';

describe('ChatBody component', () => {
  it('renders without crashing', () => {
    shallow(<ChatBody socket={mockSocket} messages={[]} currentUser={mockCurrentUser} />);
  });

  it('renders the correct number of ChatMessage components', () => {
    const wrapper = shallow(<ChatBody socket={mockSocket} messages={mockMessages} currentUser={mockCurrentUser} />);
    expect(wrapper.find(ChatMessage)).toHaveLength(mockMessages.length);
  });

  it('renders null when messages prop is empty', () => {
    const wrapper = shallow(<ChatBody socket={mockSocket} messages={[]} currentUser={mockCurrentUser} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('passes the correct props to ChatMessage components', () => {
    const wrapper = shallow(<ChatBody socket={mockSocket} messages={mockMessages} currentUser={mockCurrentUser} />);
    const chatMessageComponents = wrapper.find(ChatMessage);

    chatMessageComponents.forEach((chatMessage, index) => {
      expect(chatMessage.prop('message')).toEqual(mockMessages[index]);
      expect(chatMessage.prop('currentUser')).toEqual(mockCurrentUser);
    });
  });
});
