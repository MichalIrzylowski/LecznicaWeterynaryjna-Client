import mongoose from 'mongoose';
import User from './User';

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
},
{
  timestamps: true
})

messageSchema.pre('remove', async function(next) {
  try {
    let user = await User.findById(this.author);
    user.messages.remove(this.id);
    await user.save();
  } catch (e) {
    console.log(e);
    return next(e);
  }
})

const Message = mongoose.model('Message', messageSchema)

export default Message;
