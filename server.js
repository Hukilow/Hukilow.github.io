// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const uri = "mongodb+srv://Hukilow:<JKulopa78=>@naturedb.nremlji.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { log } = require('console');

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// ...

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// ...

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user || user.password !== password) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
// Your other middleware and routes go here
// ...

// Express session middleware
app.use(session({
  secret: generateSecret,
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ...

// Example route that requires authentication
app.get('/profile', isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.username}!`);
});

// Middleware to check if the user is authenticated
async function isAuthenticated(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
}


// Route pour gérer le formulaire de connexion
app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login.html',
  failureFlash: true
}));

// Formulaire inscription
app.post('/signup', async (req, res) => {
  const { username, password, confirmPassword } = req.body;


  // Vérifier si les mots de passe correspondent
  if (password !== confirmPassword) {
    console.log("pasl meme")
    return res.status(400).send('Les mots de passe ne correspondent pas.');

  }

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('Cet utilisateur existe déjà.');
  }

  // Enregistrer l'utilisateur dans la base de données
  const newUser = new User({ username, password });
  await newUser.save();

  // Rediriger vers la page de connexion
  res.redirect('/login.html');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));