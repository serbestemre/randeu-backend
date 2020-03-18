const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
        ]
      }
    ],
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
