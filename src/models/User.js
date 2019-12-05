const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    surname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid');
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    birthday: {
      type: Date
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Hash the plain text password before saving
// eslint-disable-next-line func-names
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8);

  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
