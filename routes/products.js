'use strict';

module.exports = function(app) {
    var todoList = require('../controllers/products');  
    const auth = require('../helper/auth')

    app.route('/products')
        .get(todoList.AllProducts);

    app.route('/products/:id/add=:number')
        .patch(auth.verifyToken,todoList.addProducts);
    
    app.route('/products/:id/reduce=:number')
        .patch(auth.verifyToken,todoList.reduceProducts);

    app.route('/products/:id')
        .get(todoList.findProducts)

    app.route('/products')
        .post(auth.verifyToken,todoList.createProducts);

    app.route('/products/:id')
        .put(auth.verifyToken,todoList.updateProducts);
    
    app.route('/products/:id')
        .delete(auth.verifyToken,todoList.deleteProducts);

};