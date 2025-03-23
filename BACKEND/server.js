const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const { connectToDB } = require('./dbConfig');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: true }));

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Passport.js Local Strategy
passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'No user with that email' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Invalid password' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToDB();
});
