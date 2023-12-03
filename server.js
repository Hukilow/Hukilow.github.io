const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Database = require('@replit/database');
const app = express();
const db = new Database();

app.use(express.static('public'));
// Configure passport
passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    // Fetch user from the database using the username
    const userData = await db.get(`user:${username}`);

    if (!userData || userData.password !== password) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    return done(null, userData);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const userData = await db.get(`user:${username}`);
  done(null, userData);
});

// Express session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Your other middleware and routes go here

// Example route that requires authentication
app.get('/profile', isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.username}!`);
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

// ... rest of your code ...
// Route pour afficher le formulaire de connexion
app.get('/login', (req, res) => {
  res.send('Afficher le formulaire de connexion ici');
});

// Route pour gérer le formulaire de connexion
app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

// Route pour déconnecter l'utilisateur
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// ... rest of your code ...


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));