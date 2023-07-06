import { User } from '../models/user.js';

import mongoose from 'mongoose';

export const getUser = async (user_name) => {
  return await User.findOne( user_name).exec();
};

export const getAllUsers = async () => {
  return await User.find().exec();
};

export const getFriends = async (user) => {
  var userObj = await User.findOne(user);
  var friends = await Promise.all(userObj.friends.map(async (friend_id) => {
    return await User.findOne({ _id: friend_id, friends: userObj._id });
  }));
  return friends.filter(x => x);
}

export const addFriend = async (user, friend_id) => {
  return await User.findOneAndUpdate(
    { name: user.name },
    { $addToSet: { friends: [friend_id] } },
    { safe: true, upsert: true }
  ).exec();
}

export const removeFriend = async (user, friend_id) => {
  return await User.findOneAndUpdate(
    { name: user.name },
    { $pull: { friends: friend_id } },
    { safe: true, upsert: true },
  ).exec();
}