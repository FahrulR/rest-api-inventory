require('dotenv').config()

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger =require('morgan')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var category_routes = require('./routes/category');
var products_routes = require('./routes/products');
var routes = require('./routes/routes')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

category_routes(app);
products_routes(app);
routes(app)

app.listen(port);
console.log('server started on: ' + port);
