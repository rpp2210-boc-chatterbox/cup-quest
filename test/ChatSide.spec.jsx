/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import ChatSide from '../src/pages/ChatSide';
import jest from 'jest';

const mockFriends = [
  { name: 'friend1' },
  { name: 'friend2' },
  { name: 'friend3' },
];
const mockSetCurrentChat = jest.fn();
const mockCurrentChat = 'friend2';

describe('ChatSide component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ChatSide
        friends={mockFriends}
        setCurrentChat={mockSetCurrentChat}
        currentChat={mockCurrentChat}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of FriendElement components', () => {
    expect(wrapper.find('FriendElement')).toHaveLength(mockFriends.length);
  });

  it('renders FriendElement components with the correct props', () => {
    const friendElements = wrapper.find('FriendElement');
    friendElements.forEach((friendElement, index) => {
      expect(friendElement.prop('friend')).toEqual(mockFriends[index]);
      expect(friendElement.prop('isSelected')).toBe(mockFriends[index].name === mockCurrentChat);
      expect(friendElement.prop('setCurrentChat')).toEqual(mockSetCurrentChat);
    });
  });

  it('calls setCurrentChat with the correct friend name when a FriendElement is clicked', () => {
    const friendElement = wrapper.find('.not-selected').at(0);
    friendElement.simulate('click');
    expect(mockSetCurrentChat).toHaveBeenCalledWith(mockFriends[0].name);
  });

  it('applies the "selected" CSS class to the currently selected FriendElement', () => {
    const selectedFriendElement = wrapper.find('.selected');
    expect(selectedFriendElement.exists()).toBe(true);
    expect(selectedFriendElement.text()).toBe(mockCurrentChat);
  });

  it('applies the "not-selected" CSS class to FriendElements that are not currently selected', () => {
    const notSelectedFriendElements = wrapper.find('.not-selected');
    expect(notSelectedFriendElements.exists()).toBe(true);
    notSelectedFriendElements.forEach((friendElement) => {
      expect(friendElement.text()).not.toBe(mockCurrentChat);
    });
  });
});
