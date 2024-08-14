const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  SchoolName: String,
  SchoolEducation: String,
  Degree: String,
  CollegeName: String,
  FieldOfStudy: String,
  Gpa: String,
  Honors: String,
  GraduationMonth: String,
  GraduationYear: String,
});
const Education =  mongoose.model('Education', educationSchema);  
module.exports = Education