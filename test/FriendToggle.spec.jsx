/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import FriendToggle from '../src/lib/FriendToggle';
import requestHandler from '../src/lib/requestHandler';

const mockId = 'friend1_id';
const mockCurrentUser = { name: 'currentUser' };

describe('FriendToggle component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FriendToggle id={mockId} currentUser={mockCurrentUser} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('sets the initial state of isFriend based on the API response', () => {
    expect(wrapper.state('isFriend')).toBe(true);
  });

  it('renders a button with the "add-remove-friend-button" class', () => {
    expect(wrapper.find('button.add-remove-friend-button').exists()).toBe(true);
  });

  it('displays the correct button text based on the initial isFriend state', () => {
    const buttonText = wrapper.find('button.add-remove-friend-button').text();
    expect(buttonText).toBe('Remove Friend');
  });

  it('calls requestHandler with the correct arguments when the button is clicked', () => {
    // Simulate button click
    const button = wrapper.find('button.add-remove-friend-button');
    button.simulate('click');

    // Expect requestHandler to be called with the correct arguments for adding or removing a friend
    expect(requestHandler).toHaveBeenCalledWith(
      `/user/${mockCurrentUser.name}`,
      { _id: mockId, state: false },
      'put',
      expect.any(Function)
    );
  });

  it('toggles the isFriend state when the button is clicked', () => {
    // Check initial state
    expect(wrapper.state('isFriend')).toBe(true);

    // Simulate button click
    const button = wrapper.find('button.add-remove-friend-button');

  });
});