/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import ChatMessage from '../src/pages/ChatMessage';

const mockMessage = {
  username: 'John',
  text: 'Hello, how are you?',
  timeStamp: Date.now(),
};
const mockCurrentUser = { name: 'John' };

describe('ChatMessage component', () => {
  it('renders without crashing', () => {
    shallow(<ChatMessage message={mockMessage} currentUser={mockCurrentUser} />);
  });

  it('displays the correct username and message text', () => {
    const wrapper = shallow(<ChatMessage message={mockMessage} currentUser={mockCurrentUser} />);
    expect(wrapper.find('.chat-message-username').text()).toBe(mockMessage.username);
    expect(wrapper.find('.chat-message-message').text()).toBe(mockMessage.text);
  });

  it('displays the correct timestamp in human-readable format', () => {
    const wrapper = shallow(<ChatMessage message={mockMessage} currentUser={mockCurrentUser} />);
    const formattedDate = new Date(mockMessage.timeStamp).toLocaleString();
    expect(wrapper.find('.chat-message-timestamp').text()).toBe(formattedDate);
  });

  it('renders with the correct CSS class for own messages', () => {
    const wrapper = shallow(<ChatMessage message={mockMessage} currentUser={mockCurrentUser} />);
    expect(wrapper.hasClass('own-message')).toBe(true);
  });

  it('renders with the correct CSS class for other users\' messages', () => {
    const otherUserMessage = { ...mockMessage, username: 'Alice' };
    const wrapper = shallow(<ChatMessage message={otherUserMessage} currentUser={mockCurrentUser} />);
    expect(wrapper.hasClass('own-message')).toBe(false);
  });
});
