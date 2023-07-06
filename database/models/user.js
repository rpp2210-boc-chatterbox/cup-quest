import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true },
  phone: { type: String },
  picture: { type: String },
  bio: {type: String, default: '' },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  // location: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export { User };
