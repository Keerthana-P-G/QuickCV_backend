const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skills: [String],
    interests: [String]
});

module.exports = mongoose.model('Skill', skillSchema);
