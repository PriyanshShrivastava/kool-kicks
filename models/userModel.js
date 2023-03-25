import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter a email address to sign up'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    phone: {
      type: Number,
      default: 9999999999,
    },
    answer: {
      type: String,
      required: [true, 'Please answer the security question'],
    },
    address: {
      type: String,
      default: '',
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
