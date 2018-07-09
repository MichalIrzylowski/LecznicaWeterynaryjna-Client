import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Imię'
  },
  surname: {
    type: String,
    default: 'Nazwisko'
  },
  isVet: {
    type: Boolean,
    default: false
  },
  profileImgUrl: {
    type: String,
    default: 'https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg'
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
})

userSchema.pre('save', async function (next) {
  try {
    if(!this.isModified('password')) {
      return next()
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (e) {
    return next(e);
  }
})

userSchema.methods.comparePasswords = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
}

const User = mongoose.model('User', userSchema);

export default User;
