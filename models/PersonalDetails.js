const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  github: String,
  linkedin: String,
});

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
