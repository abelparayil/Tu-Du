import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

export default mongoose.model('User', userSchema);
