// Library
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Instances
const app = express();
const db = require('./config/database');
db.authenticate()
  .then(() => console.log(`Database connected`))
  .catch((err) => console.log('Error: ' + err));

// Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.send('INDEX');
});

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;
const url = `http://localhost:${PORT}`;
app.listen(PORT, () => console.log(`Server running on ${url}`));
