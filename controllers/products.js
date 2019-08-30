'use strict';

var connection = require('../config/conn');

// get all products, sortby, sort, pagination, and search
exports.AllProducts = function (req, res) {
    console.log('someone access products')
    const sortBy = req.query.sortBy || 'id';
    const sort = req.query.sort || 'ASC';
    const limit = req.query.limit || 10;
    const page = (req.query.page - 1) * limit || 0;
    const search = req.query.search
    let query = 'select id, name, description, image,(select name from category where products.id_category = category.id) as category, quantity, date_added, date_updated from products';

    if (req.query.search) {
        connection.query(query + ' where name like "%' + search + '%" order by ' + sortBy + ' ' + sort + ' limit ' + page + ', ' + limit, function (err, results) {
            console.log(req.body)
            if (err) {
                console.log(err)
            } else if (results.length > 0) {
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Successfully get the data with query search = ' + req.query.search,
                    data: results
                })
            } else {
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'No data found',
                })
            }
        });
    } else {
        connection.query(query + ' order by ' + sortBy + ' ' + sort + ' limit ' + page + ', ' + limit, function (err, results) {
            // console.log(results) 
            if (results !== undefined) {
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Successfully get all the data',
                    data: results,
                })
            } else {
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Wrong value key in params',
                })
            }
        });
    }
};


//add product quantity
exports.addProducts = function (req, res) {
    console.log('someone access add products')
    var number = req.params.number
    connection.query('UPDATE products SET quantity = quantity + ' + number + ' where id = ? ',
        [req.params.id],
        function (err, results) {
            if (err) {
                console.log(err)
            } else if (results.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Quantity data added by ' + number + ' with id:' + req.params.id
                })
            } else {
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Failed to add quantity data, id not found ',
                })

            }
        })
}


//reduce product quantity
exports.reduceProducts = function (req, res) {
    console.log('someone access reduce products')
    var number = req.params.number
    var id = req.params.id
    connection.query('UPDATE products SET quantity = quantity - ' + number + ' WHERE id = ' + id + ' AND quantity >= ' + number,
        function (err, results) {
            if (err) {
                console.log(err)
            } else if (results.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Quantity data reduced by ' + number + ' with id:' + req.params.id,
                })
            } else if (results.affectedRows == 0) {
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Quantity data cannot be reduced to less than 0',
                })
            } else {
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Failed to reduce quantity data, id not found ',
                })

            }
        })
}

// find single data by id
exports.findProducts = function (req, res) {
    console.log('someone access find products')

    connection.query('SELECT id, name, description, image, (select name from category where products.id_category = category.id) as category, quantity, date_added, date_updated from products WHERE id = ?', req.params.id, function (err, results, fields) {
        if (err) {
            console.log(err)
        } else {
            if (results.length > 0) {
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
exports.createProducts = function (req, res) {
    console.log('someone access create products')
    const {
        name,
        description,
        image,
        id_category,
        quantity
    } = req.body
    const date = new Date()

    if (!name || !description || !image || !id_category || !quantity) {
        res.status(300).json({
            status: 300,
            error: true,
            message: 'field needed for update!',
        })
    } else {
        connection.query('INSERT INTO products (name, description, image, id_category, quantity, date_added, date_updated) values (?, ?, ?, ?, ?, ?, ?)',
            [name, description, image, id_category, quantity, date, date],
            function (err, results) {
                if (err) {
                    console.log(err)
                    res.status(400).json({
                        status: 400,
                        message: 'Error add new data!',
                    })
                } else {
                    res.status(200).json({
                        status: 200,
                        error: false,
                        message: 'Successfully add new product data!',
                        data: req.body
                    })
                }
            })
    }
};

// update data
exports.updateProducts = function (req, res) {
    console.log('someone access update products')
    const {
        name,
        description,
        image,
        id_category,
        quantity
    } = req.body
    const date = new Date()

    if (!name || !description || !image || !id_category || !quantity) {
        res.status(300).json({
            status: 300,
            error: true,
            message: 'field needed for update!',
        })
    } else {
        connection.query('UPDATE products SET name = ?, description = ?, image = ?, id_category = ?, quantity = ?, date_updated = ? where id = ?',
            [name, description, image, id_category, quantity, date, req.params.id],
            function (err, results) {
                if (err) {
                    console.log(err)
                } else if (results.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        error: false,
                        message: 'Successfully update product data with id: ' + req.params.id,
                        data: req.body
                    })
                } else {
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'Failed to update product, id not found ',
                    })
                }
            })
    }
};

// delete data
exports.deleteProducts = function (req, res) {
    console.log('someone access delete products')

    connection.query('DELETE from products WHERE id = ?',
        [req.params.id],
        function (err, results) {
            if (err) {
                console.log(err)
            } else {
                if (results.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        error: false,
                        message: 'Successfully delete product data with id: ' + req.params.id,
                    })
                } else {
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'Cannot delete product data, id not found ',
                    })
                }
            }
        })
};
