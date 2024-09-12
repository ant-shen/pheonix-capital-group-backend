const mongoose = require('mongoose');

const LandHoldingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  legalEntity: {
    type: String,
    required: true,
  },
  netMineralAcres: {
    type: Number,
    required: true,
  },
  mineralOwnerRoyalty: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{3}$/.test(v); // Validates section as 3 digits
      },
      message: props => `${props.value} is not a valid section! Section must be exactly 3 digits.`,
    },
  },
  township: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{3}[NS]$/.test(v); // Validates township format
      },
      message: props => `${props.value} is not a valid township! Township must be 3 digits followed by "N" or "S".`,
    },
  },
  range: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{3}[EW]$/.test(v); // Validates range format
      },
      message: props => `${props.value} is not a valid range! Range must be 3 digits followed by "E" or "W".`,
    },
  },
  sectionName: {
    type: String, // Auto-generated field, not required to be provided
  },
  titleSource: {
    type: String,
    enum: ['Class A', 'Class B', 'Class C', 'Class D'], // Dropdown options
    required: true,
  },
});

// Middleware to auto-generate `sectionName` before saving the document
LandHoldingSchema.pre('save', function(next) {
  // Only auto-generate if section, township, and range are provided
  if (this.section && this.township && this.range) {
    this.sectionName = `${this.section}-${this.township}-${this.range}`;
  }
  next();
});

module.exports = mongoose.model('LandHolding', LandHoldingSchema);
