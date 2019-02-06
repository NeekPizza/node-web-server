const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Heroku Port
const port = process.env.PORT || 3000;

// Register app as express
var app = express();

// Tell hbs to use partials at direct path
hbs.registerPartials(__dirname + '/views/partials')

// Tell app to use hbs as view engine
app.set('view engine', 'hbs');

// Register middleware for server log
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}; ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Register hbs methods to reference in template
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// Routes
app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my  website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

// Run server
app.listen(port, () => console.log(`Server running on port ${port}`));