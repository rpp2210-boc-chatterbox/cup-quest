import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  username: { type: String, required: true },
  profilePic: { type: String, required: true },
  rating: { type: Number, required: true },
  drink: { type: String, required: true },
  comments: { type: String },
  reported: { type: Boolean, default: false },
  likes: {type: Number, default: 0},
  dislikes: {type: Number, default: 0}
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export { Review };