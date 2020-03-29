const mongoose = require('mongoose');
const moment = require("moment-timezone");

const Schema = mongoose.Schema;

const dateIstanbul = moment.tz(Date.now(), "Europe/Istanbul");

const businessSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    sector: {
      type: Schema.Types.ObjectId,
      ref: 'Sector'
    },
    businessType: {
      type: Schema.Types.ObjectId,
      ref: 'BusinessType'
    },
    businessOwnerList: [
      {
        businessOwner: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    employeeList: [
      {
        employee: { type: Schema.Types.ObjectId, ref: 'User' },
        providingServices: [
          {
            service: {
              type: Schema.Types.ObjectId,
              ref: 'Service'
            },
            price: { type: Number },
            duration: { type: Number }
          }
        ],
        workingHours: [{
          day: { type: String },
          opening: { type: Date, default: dateIstanbul },
          closing: { type: Date, default: dateIstanbul },
          interval: { type: Number }
        }]
      }
    ],
    businessWorkingHours: [{
      day: { type: String },
      opening: { type: Date, default: dateIstanbul },
      closing: { type: Date, default: dateIstanbul },
      interval: { type: Number }
    }],
    comments: [
      {
        commentOwner: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        commentText: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: dateIstanbul,
          required: true
        }
      }
    ],
    rates: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Business', businessSchema);
