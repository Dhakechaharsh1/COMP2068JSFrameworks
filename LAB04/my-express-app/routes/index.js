var express = require('express');
var router = express.Router();

// Define the navigation links
const navLinks = [
  { href: '/', text: 'Home' },
  { href: '/salman', text: 'Salman Khan' },
  { href: '/srk', text: 'Shah Rukh Khan (SRK)' },
  { href: '/aamir', text: 'Aamir Khan' },
  { href: '/emraan', text: 'Emraan Hashmi' }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Favorite People', navLinks: navLinks });
});

/* GET Salman Khan page. */
router.get('/salman', function(req, res, next) {
  res.render('actor1', { title: 'Salman Khan', navLinks: navLinks });
});

/* GET Shah Rukh Khan (SRK) page. */
router.get('/srk', function(req, res, next) {
  res.render('actor2', { title: 'Shah Rukh Khan (SRK)', navLinks: navLinks });
});

/* GET Aamir Khan page. */
router.get('/aamir', function(req, res, next) {
  res.render('actor3', { title: 'Aamir Khan', navLinks: navLinks });
});

/* GET Emraan Hashmi page. */
router.get('/emraan', function(req, res, next) {
  res.render('actor4', { title: 'Emraan Hashmi', navLinks: navLinks });
});

module.exports = router;
