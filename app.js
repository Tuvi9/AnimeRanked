const express = require('express');
//* app is used to define routes, middleware, etc etc.
const app = express();
const routes = require('./routes/my_routes');

app.use('/test', routes);

//* I export app since server.js needs acces to it.
module.exports = app;


