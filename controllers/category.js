'use strict';

var connection = require('../config/conn');

// get all the data
exports.Category = function(req, res) {
    console.log('someone access category')

    connection.query('SELECT * FROM category', function(err, results, fields){
        if(err) {
            console.log(err)
        } else {
            res.status(200).json({
                status: 200,
                error: false,
                message: 'Successfully get all category data!',
                data: results
            })
        }
    })
};

//find single data by id
exports.findCategory = function(req, res) {
    console.log('someone access find category')

    connection.query('SELECT * FROM category WHERE id = ?', req.params.id, function(err, results, fields){
        if(err) {
            console.log(err)
        } else {
           if(results.length > 0) {
            res.status(200).json({
                status: 200,
                error: false,
                message: 'Successfully get single data!',
                data: results
            })
           } else {
            res.status(400).json({
                status: 400,
                error: true,
                message: 'No data found!',
            })
           }
        }
    })
};


// insert data
exports.createCategory = function(req, res) {
    console.log('someone access create category')

    const { name } = req.body
    if(!name) {
        res.status(300).json({
            status: 300,
            error: true,
            message: 'name needed for update!',
        })
    } else {
    connection.query('INSERT INTO category (name) values (?)',
    [name], function(err, results){
        if(err) {
            console.log(err)
            res.status(400).json({
                status: 400,
                message: 'Error add new data!', 
            })
        } else {
            res.status(200).json({
                status: 200,
                error: false,
                message: 'Successfully add new category data!',
                data: req.body
            })
        }
    })
}
};


//update data
exports.updateCategory = function(req, res) {
    console.log('someone access update category')

    const { name } = req.body

    if(!name) {
        res.status(300).json({
            status: 300,
            error: true,
            message: 'name needed for update!',
        })
    } else{
        connection.query('UPDATE category SET name = ? where id = ?',
    [ name, req.params.id],
    function(err, results) {
        if(err) {
            console.log(err)
        } else if(results.affectedRows > 0){
            res.status(200).json({
                status: 200,
                error: false,
                message: 'Successfully update category data with id: ' + req.params.id,
                data: req.body
            })
        }
        else {
            res.status(400).json({
                status: 400,
                error: true,
                message: 'Failed to update category, id not found ',
            })
          }
    })
    }
};

// deleta data
exports.deleteCategory = function(req, res) {
    console.log('someone access delete category')

    connection.query('DELETE from category WHERE id = ?',
    [ req.params.id ],
    function(err, results) {
        if(err) {
            console.log(err)
        } else {
            if(results.affectedRows > 0 ){
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Successfully delete category data with id: ' + req.params.id,
                })
            } else {
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Cannot delete category data, id not found ',
                })
            }
        }
    })
};

