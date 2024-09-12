const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    enum: ['Company', 'Individual', 'Investor', 'Trust'],
    required: true,
  },
  ownerType: {
    type: String,
    enum: ['Competitor', 'Seller', 'Investor', 'Professional'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  totalLandHoldings: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Owner', OwnerSchema);
