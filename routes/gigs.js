// Library
const express = require('express');

// Instances
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Routes
// GET gig list
router.get('/', (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      const context = {
        userDocuments: gigs.map((document) => {
          return {
            title: document.title,
            technologies: document.technologies,
            description: document.description,
            budget: document.budget,
            contact_email: document.contact_email,
          };
        }),
      };
      console.log(gigs);
      res.render('gigs', { gigs: context.userDocuments });
    })
    .catch((err) => console.log(err))
);

// POST a gig
router.get('/add', (req, res) => {
  const data = {
    title: 'Simple Wordpress app',
    technologies: 'wordpress, javascript, html, css',
    budget: '$2500',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    contact_email: 'user2@gmail.com',
  };

  let { title, technologies, budget, description, contact_email } = data;
  Gig.create({ title, technologies, budget, description, contact_email })
    .then((gig) => res.redirect('/gigs'))
    .catch((err) => console.log(err));
});

module.exports = router;
