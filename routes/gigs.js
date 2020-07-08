// Library
const express = require('express');
const Sequelize = require('sequelize'); // in order to search
const Op = Sequelize.Op;

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
      res.render('gigs', { gigs: context.userDocuments });
    })
    .catch((err) => console.log(err))
);

// Display add Gig Form
router.get('/add', (req, res) => res.render('add'));

// POST a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: 'Please add title!' });
  }

  if (!technologies) {
    errors.push({ text: 'Please add some technologies!' });
  }

  if (!description) {
    errors.push({ text: 'Please add a description!' });
  }

  if (!contact_email) {
    errors.push({ text: 'Please add contact email!' });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = 'unknown';
    } else {
      budget = `$${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ',');

    Gig.create({ title, technologies, budget, description, contact_email })
      .then((gig) => res.redirect('/gigs'))
      .catch((err) => console.log(err));
  }
});

// Search for Gigs
router.get('/search', (req, res) => {
  const { term } = req.query;

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
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
      res.render('gigs', { gigs: context.userDocuments });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
