'use strict';
const auth = require('../helper/auth')

module.exports = function(app) {
    var todoList = require('../controllers/category');

    app.route('/category')
        .get(todoList.Category);

    app.route('/category/:id')
        .get(todoList.findCategory);

    app.route('/category')
        .post(auth.verifyToken,todoList.createCategory);

    app.route('/category/:id')
        .put(auth.verifyToken,todoList.updateCategory);
    
    app.route('/category/:id')
        .delete(auth.verifyToken,todoList.deleteCategory);

};