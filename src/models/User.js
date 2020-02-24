const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Constants = require("../constants");

const userSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true
    },
    roles: [
      {
        type: Number,
        enum: [...Object.values(Constants.ROLES)]
      }
    ],
    local: {
      fullName: {
        type: String
      },
      email: {
        type: String
      },
      password: {
        type: String
      },
      passwordCheck: {
        type: String
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
    google: {
      id: {
        type: String
      },
      email: {
        type: String
      },
      name: {
        type: String
      },
      surname: {
        type: String
      }
    },
    facebook: {
      id: {
        type: String
      },
      email: {
        type: String
      },
      fullName: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// eslint-disable-next-line func-names
// userSchema.methods.generateAuthToken = async function() {
//   const user = this;
//   const token = jwt.sign(
//     { _id: user._id.toString() },
//     process.env.JWT_SECRET_KEY
//   );

//   user.local.tokens = user.local.tokens.concat({ token });
//   await user.save();

//   return token;
// };

// eslint-disable-next-line func-names
userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    console.log("this.local.password", this.local.password);
    console.log("newPassword", newPassword);
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

// userSchema.statics.findByCredentials = async (email, password) => {
//   // eslint-disable-next-line no-use-before-define
//   const user = await User.findOne({ 'local.email': email });

//   if (!user) {
//     throw new Error('Unable to login user');
//   }

//   const isMatch = await bcrypt.compare(password, user.local.password);

//   if (!isMatch) {
//     throw new Error('Unable to login');
//   }

//   return user;
// };

// Hash the plain text password before saving
// eslint-disable-next-line func-names

userSchema.pre("save", async function(next) {
  try {
    if (this.method !== "local") next();
    // Generate a password hash(salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, 8);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
