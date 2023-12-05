// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

// Define User schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String  // 'teacher' or 'student'
});

// Hash passwords before saving
UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Define Course schema
const CourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

// Define models
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

// Initialize Express app
const app = express();

// Configure Passport for authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) return done(err);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, {message: 'Invalid username or password.'});
      }
      return done(null, user);
    });
  }
));

// Define routes
app.get('/login', function(req, res) {
  res.send('Login page');
});

app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

app.get('/courses', function(req, res) {
  Course.find({}, function(err, courses) {
    res.json(courses);
  });
});

app.post('/courses', function(req, res) {
  if (req.user.role !== 'teacher') {
    res.status(403).send('Only teachers can create courses.');
    return;
  }
  const course = new Course(req.body);
  course.teacher = req.user._id;
  course.save(function(err) {
    if (err) res.status(500).send(err);
    else res.json(course);
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
