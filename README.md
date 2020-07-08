# steps

npm i express
npm i body-parser
npm i sequelize \* [https://sequelize.org/master/manual/getting-started.html]
npm install pg pg-hstore // postgre
npm install express-handlebars

npm i -D nodemon

# in app.js

// Connect to Database
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
host: 'locahost',
dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
operatorAliases: false,

    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },

    //SQLite only
    storage: 'path/to/database.sqlite'

});

# handlebars handling
