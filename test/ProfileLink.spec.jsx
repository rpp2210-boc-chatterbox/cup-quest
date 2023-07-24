/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import ProfileLink from '../src/lib/ProfileLink';

// Mock the necessary props and data for the ProfileLink component
const mockName = 'friend1';
const mockCurrentUser = { name: 'currentUser' };

describe('ProfileLink component', () => {
  it('renders without crashing', () => {
    shallow(<ProfileLink name={mockName} currentUser={mockCurrentUser} />);
  });

  it('renders a Link component with the correct "to" and "state" props', () => {
    const wrapper = shallow(<ProfileLink name={mockName} currentUser={mockCurrentUser} />);
    const link = wrapper.find(Link);

    expect(link.exists()).toBe(true);
    expect(link.prop('to')).toEqual({ pathname: `/user/${mockName}` });
    expect(link.prop('state')).toEqual({ currentUser: mockCurrentUser });
  });

  it('renders a div with the "friend-profile-name" class', () => {
    const wrapper = shallow(<ProfileLink name={mockName} currentUser={mockCurrentUser} />);
    expect(wrapper.find('div.friend-profile-name').exists()).toBe(true);
  });

  it('displays the correct name within the "friend-profile-name" div', () => {
    const wrapper = shallow(<ProfileLink name={mockName} currentUser={mockCurrentUser} />);
    expect(wrapper.find('div.friend-profile-name').text()).toBe(mockName);
  });
});
