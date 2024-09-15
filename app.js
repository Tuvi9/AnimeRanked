const express = require('express');
//* app is used to define routes, middleware, etc etc.
const app = express();
const path = require('path');
const routes = require('./routes/my_routes');
const mongodb = require('./config/database')

//* Connects to MongoDB
mongodb.main();

//? Makes it possible for dist/bundle.js to access index.html
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

//* Handles HTTP requests.
app.use('/blog', routes);
//! A catch-all route must be defined last if not every single request will be caught by it instead.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

//* I export app since server.js needs acces to it.
module.exports = app;


