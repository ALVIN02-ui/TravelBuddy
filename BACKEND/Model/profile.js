const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: String,
  travelDate: Date,
  interests: String,
  budget: String,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
