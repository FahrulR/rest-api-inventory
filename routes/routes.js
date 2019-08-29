'use strict';

module.exports = function(app) {
    var todoList = require('../controllers/controllers');  
    
    app.route('/')
        .get(todoList.Index);
    
    app.route('/Users')
        .get(todoList.Users);

    app.route('*')
        .get(todoList.notFound);

    app.route('/Login')
        .post(todoList.Login);

    app.route('/Register')
        .post(todoList.Register);


};