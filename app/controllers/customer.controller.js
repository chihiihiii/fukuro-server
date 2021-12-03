const db = require("../models");
const Customer = db.Customers;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const PasswordReset = db.PasswordResets;


//Customer login
exports.login = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Không để trống tên đăng nhập hoặc mật khẩu!"
        });
        return;
    }

    const myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    const username = req.body.username;
    // var password = req.body.password;
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
                var result = {
                    message: "Tên người dùng hoặc mật khẩu không đúng!"
                }
                res.status(500).send(result);
            } else {
                var token = jwt.sign({
                    username: data.username,
                    password: data.password
                }, 'secret', {
                    noTimestamp: true,
                    expiresIn: 60 * 60 * 24 * 7
                });
                var result = {
                    message: "Đăng nhập thành công!",
                    data: data,
                    token: token
                }
                res.status(200).send(result);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customer."
            });
        });
}

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Không để trống tên đăng nhập hoặc mật khẩu!"
        });
        return;
    }

    Customer.findOne({
            where: {
                username: req.body.username,
            }
        })
        .then(data => {
            // res.send(data);
            if (data) {
                var result = {
                    message: "Tên người dùng đã tồn tại!"
                }
                res.send(result);
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customer."
            });
        });


    Customer.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then(data => {
            // res.send(data);
            if (data) {
                var result = {
                    message: "Email đã tồn tại!"
                }
                res.send(result);
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customer."
            });
        });


    const myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    var password = myKey
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
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status
    };

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
    var id = req.params.id;
    Customer.findByPk(id)
        .then(data => {
            // var mykey = crypto.createDecipher('aes-128-cbc', process.env.SECRET_KEY);
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
    const myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    var id = req.params.id;
    // var password = myKey
    //     .update(req.body.password)
    //     .digest('hex');
    // Create a Customer
    const customer = {
        avatar: req.body.avatar,
        username: req.body.username,
        // password: password,
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
    var id = req.params.id;

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

// Update password Customer by the id in the request
exports.changePassword = (req, res) => {
    var id = req.body.id;
    var old_password = crypto.createHmac('sha256', process.env.SECRET_KEY)
        .update(req.body.old_password)
        .digest('hex');
    var new_password = crypto.createHmac('sha256', process.env.SECRET_KEY)
        .update(req.body.new_password)
        .digest('hex');

    Customer.findOne({
            where: {
                id: id,
                password: old_password
            }
        }).then(data => {

            if (data) {
                const customer = {
                    password: new_password
                };

                Customer.update(customer, {
                        where: {
                            id: id
                        }
                    })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Customer was updated password successfully."
                            });
                        } else {
                            res.send({
                                message: `Cannot update Customer password with id=${id}. Maybe Customer was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Customer with id=" + id
                        });
                    });

            } else {
                res.send('Old pass incorrect');

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });

};

// Update password Customer by the id in the request
exports.forgotPassword = (req, res) => {
    var username = req.body.username;
    var email = req.body.email;

    var condition = {
        username: username,
        email: email
    }
    // res.send(condition);



    Customer.findOne({
            where: condition
        })
        .then(data => {
            // res.send(data);


            if (data) {

                var token = crypto.randomBytes(32).toString('hex');

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.SEND_MAIL_USER,
                        pass: process.env.SEND_MAIL_PASS
                    }
                });

                var mailOptions = {
                    from: process.env.SEND_MAIL_USER,
                    to: email,
                    subject: 'Reset Password for ' + username,
                    // text: 'hahahaha',
                    html: `<a href="${process.env.PORT_CLIENT}/reset-password?email=${email}&token=${token}">Đặt lại mật khẩu</a>`
                };

                PasswordReset.findOne({
                    where: {
                        email: email
                    }
                }).then(data => {

                    if (data) {


                        var passwordReset = {
                            token: token
                        }
                        // res.send(passwordReset);
                        // Save token in the database
                        PasswordReset.update(passwordReset, {
                                where: {
                                    email: email
                                }
                            })
                            .then(num => {
                                if (num == 1) {
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            // console.log(error);
                                            res.send(error);
                                        } else {
                                            // console.log('Email sent: ' + info.response);
                                            res.send('Success');

                                        }
                                    });
                                } else {
                                    res.send({
                                        message: 'Lỗi update token in Password Reset'
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while creating the Password Reset."
                                });
                            });


                    } else {

                        var passwordReset = {
                            email: email,
                            token: token
                        }
                        // res.send(passwordReset);
                        // Save token in the database
                        PasswordReset.create(passwordReset)
                            .then(data => {
                                // res.send(data);

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        // console.log(error);
                                        res.send(error);
                                    } else {
                                        // console.log('Email sent: ' + info.response);
                                        res.send('Success');

                                    }
                                });

                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while creating the Password Reset."
                                });
                            });


                    }


                });






            } else {
                res.send('Tên đăng nhập hoặc email không chính xác!');

            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customer."
            });
        });




};