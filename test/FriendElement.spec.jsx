/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import FriendElement from '../src/pages/FriendElement';

const mockFriend = { name: 'friend1' };
const mockCurrentUser = { name: 'currentUser' };

describe('FriendElement component', () => {
  it('renders without crashing', () => {
    shallow(<FriendElement friend={mockFriend} currentUser={mockCurrentUser} />);
  });

  it('renders a div with the "friend" class', () => {
    const wrapper = shallow(<FriendElement friend={mockFriend} currentUser={mockCurrentUser} />);
    expect(wrapper.find('div.friend').exists()).toBe(true);
  });

  it('renders the ProfileLink component with the correct props', () => {
    const wrapper = shallow(<FriendElement friend={mockFriend} currentUser={mockCurrentUser} />);
    const profileLink = wrapper.find('ProfileLink');

    expect(profileLink.exists()).toBe(true);
    expect(profileLink.prop('name')).toBe(mockFriend.name);
    expect(profileLink.prop('currentUser')).toEqual(mockCurrentUser);
  });

  it('renders a div with the "friend-profile-pic" class', () => {
    const wrapper = shallow(<FriendElement friend={mockFriend} currentUser={mockCurrentUser} />);
    expect(wrapper.find('div.friend-profile-pic').exists()).toBe(true);
  });
});
