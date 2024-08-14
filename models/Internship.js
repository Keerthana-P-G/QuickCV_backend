const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  companyName: {
    type:String,
    required:true
  },
  location: {
    type:String,
    required:true
  },
  topic: {
    type:String,
    required:true
  },
  fromDate: {
    type:String,
    required:true
  },
  toDate: {
    type:String,
    required:true
  },
});

module.exports = mongoose.model('Internship', internshipSchema);
