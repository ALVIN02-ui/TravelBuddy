const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// Create or Update Profile Route
router.post('/', async (req, res) => {
  const { userId, destination, travelDate, interests, budget } = req.body;

  try {
    const profile = new Profile({
      userId,
      destination,
      travelDate,
      interests,
      budget,
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created/updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile' });
  }
});

module.exports = router;
