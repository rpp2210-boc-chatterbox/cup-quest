import { User } from '../models/user.js';

export const getUser = async (user_name) => {
  return await User.findOne(user_name).exec();
};