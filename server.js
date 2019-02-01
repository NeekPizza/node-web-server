const express = require('express');
const hbs = require('hbs');

// Register app as express
var app = express();

// Tell hbs to use partials at direct path
hbs.registerPartials(__dirname + '/views/partials')
// Tell app to use hbs as view engine
app.set('view engine', 'hbs');
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

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

// Run server
app.listen(3000, () => console.log('Server running on port 3000'));