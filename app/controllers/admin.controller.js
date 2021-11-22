const db = require("../models");
const Admin = db.Admins;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const myKey = crypto.createHmac('sha256', 'mypassword');


// Admin login
exports.login = (req, res) => {
    let username = req.body.username;
    // const password = req.body.password;

    Admin.findOne({
            where: {
                username
            }
        })
        .then(data => {
            let password = myKey
                .update(req.body.password)
                .digest('hex');

            if (password != data.dataValues.password) {
                const result = {
                    message: "Tên người dùng hoặc mật khẩu không đúng!"
                }
                res.status(500).send(result);
            } else {
                const token = jwt.sign({
                    username: data.dataValues.username,
                    password: data.dataValues.password
                }, 'secret', {
                    noTimestamp: true,
                    expiresIn: 60 * 60 * 24 * 7
                });
                const result = {
                    message: "Đăng nhập thành công!",
                    data: data,
                    token: token
                }
                res.status(200).send(result);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Tên người dùng hoặc mật khẩu không đúng!"
            });
        });
}

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request

    let password = myKey
        .update(req.body.password)
        .digest('hex');

    // Create a Admin
    const admin = {
        avatar: req.body.avatar,
        username: req.body.username,
        password: password,
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        role: req.body.role,
        status: req.body.status,

    };

    // Save Admin in the database
    Admin.create(admin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Admin."
            });
        });
};

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
    // let username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition = null;

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Admin.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving admins."
            });
        });
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    Admin.findByPk(id)
        .then(data => {

            // var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
            // mykey.update(data.password, 'hex', 'utf8')
            // data.password = mykey.final('utf8');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Admin with id=" + id
            });
        });
};

// Update a Admin by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;
    let password = myKey
        .update(req.body.password)
        .digest('hex');
    // Create a Customer
    const admin = {
        avatar: req.body.avatar,
        username: req.body.username,
        password: mystr,
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        status: req.body.status,
    };

    Admin.update(admin, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Admin with id=" + id
            });
        });
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    Admin.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Admin with id=" + id
            });
        });
};

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
    Admin.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Admins were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all admins."
            });
        });
};

// find all published Admin
// exports.findAllPublished = (req, res) => {
//     Admin.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving admins."
//             });
//         });
// };