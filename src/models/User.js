const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CONSTANTS = require("../constants");

const Schema = mongoose.Schema;

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
        enum: [...Object.values(CONSTANTS.ROLES)]
      }
    ],
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    birthday: { type: Date },
    id: { type: String },
    ownedBusinesses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Business"
      }
    ],
    workingBusinesses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Business"
      }
    ],
    appointments: [
      {
        businessName: {
          type: String
        },
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        }
      }
    ],
    isActive: {
      type: Boolean,
      default: false
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
userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    console.log("this.password", this.password);
    console.log("newPassword", newPassword);
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
