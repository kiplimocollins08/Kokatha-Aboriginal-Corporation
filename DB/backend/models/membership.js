const mongoose = require('mongoose');

const memberhipSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String
  },
  last_name: {
    required: true,
    type: String
  },
  single_name: {
    required: true,
    type: String
  },
  aka: {
    required: false,
    type: String
  },
  mobile: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  home_phone: {
    required: true,
    type: String
  },
  work_phone: {
    required: false,
    default: "-",
    type: String
  },
  member_id: {
    required: true,
    type: String,
    unique: true,
    dropDups: true,
  },
  street_address: {
    required: true,
    type: String
  },
  suburb: {
    required: true,
    type: String
  },
  state: {
    required: true,
    type: String
  },
  dob: {
    required: true,
    type: Date
  },
  date_of_membership: {
    required: true,
    type: Date
  }
});

module.exports = mongoose.model('MembershipModel', memberhipSchema);