const Profile = require('../models/Profile');

// Create or Update Profile Controller
exports.createOrUpdateProfile = async (req, res) => {
  const { destination, travelDate, interests, budget } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated and `req.user` contains the user object

  try {
    // Check if the profile already exists for the user
    let profile = await Profile.findOne({ userId });

    if (profile) {
      // If the profile exists, update it
      profile.destination = destination;
      profile.travelDate = travelDate;
      profile.interests = interests;
      profile.budget = budget;
      
      await profile.save();
      return res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      // If the profile doesn't exist, create a new one
      profile = new Profile({
        userId,
        destination,
        travelDate,
        interests,
        budget,
      });

      await profile.save();
      return res.status(201).json({ message: 'Profile created successfully' });
    }
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    res.status(500).json({ message: 'Error saving profile' });
  }
};

// Get User Profile Controller
exports.getUserProfile = async (req, res) => {
  const userId = req.user.id; // Assuming the user is authenticated and `req.user` contains the user object

  try {
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
