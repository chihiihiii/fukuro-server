const db = require("../models");
const Customer = db.Customers;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const crypto = require('crypto');



//Customer login
exports.login = (req, res) => {
    const myKey = crypto.createHmac('sha256', 'mypassword');
    const username = req.body.username;
    // let password = req.body.password;
    const password = myKey
        .update(req.body.password)
        .digest('hex');
    Customer.findOne({
            where: {
                username: username
            }
        })
        .then(data => {


            // res.send(data);
            if (password != data.password) {
                let result = {
                    message: "Tên người dùng hoặc mật khẩu không đúng!"
                }
                res.status(500).send(result);
            } else {
                let token = jwt.sign({
                    username: data.username,
                    password: data.password
                }, 'secret', {
                    noTimestamp: true,
                    expiresIn: 60 * 60 * 24 * 7
                });
                let result = {
                    message: "Đăng nhập thành công!",
                    data: data,
                    token: token
                }
                res.status(200).send(result);
            }
        })
        .catch(err => {
            // res.status(500).send({
            //     message: "Tên người dùng hoặc mật khẩu không đúng!"
            // });
            // res.send(username);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customer."
            });
        });
}

// Create and Save a new Customer
exports.create = (req, res) => {
    const myKey = crypto.createHmac('sha256', 'mypassword');
    let password = myKey
        .update(req.body.password)
        .digest('hex');
    // Create a Customer
    const customer = {
        avatar: req.body.avatar,
        username: req.body.username,
        // password: mystr,
        password: password,
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        status: req.body.status,
    };

    // Save Customer in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    // let username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition = null;



    // Customer.findAll({
    //         where: condition
    //     })
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while retrieving customers."
    //         });
    //     });

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Customer.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    let id = req.params.id;
    Customer.findByPk(id)
        .then(data => {
            // var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
            // mykey.update(data.password, 'hex', 'utf8')
            // data.password = mykey.final('utf8');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
    const myKey = crypto.createHmac('sha256', 'mypassword');
    let id = req.params.id;
    let password = myKey
        .update(req.body.password)
        .digest('hex');
    // Create a Customer
    const customer = {
        avatar: req.body.avatar,
        username: req.body.username,
        password: password,
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        status: req.body.status,
    };
    Customer.update(customer, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    Customer.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Customers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all customers."
            });
        });
};