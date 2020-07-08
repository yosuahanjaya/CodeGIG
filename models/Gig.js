// Library
const Sequelize = require('sequelize');

// Instances
const db = require('../config/database');

// Schema
const Gig = db.define('gig', {
  title: {
    type: Sequelize.STRING,
  },
  technologies: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.STRING,
  },
  contact_email: {
    type: Sequelize.STRING,
  },
});

module.exports = Gig;
