const express = require('express');
//* app is used to define routes, middleware, etc etc.
const app = express();
const path = require('path');
const routes = require('./routes/my_routes');
const mongodb = require('./config/database')

//* Connects to MongoDB
mongodb.main();

//? Makes it possible for ejs to access my stylesheets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//?Render html
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.get('/html', (req, res) => {
    res.render('main');
})

//* Handles HTTP requests.
app.use('/blog', routes);


//* I export app since server.js needs acces to it.
module.exports = app;


