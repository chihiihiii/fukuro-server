const db = require("../models");
const Admin = db.Admins;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');




// Admin login
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
    Admin.findOne({
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
                message: err.message || "Some error occurred while retrieving Admin."
            });
        });
}

// Create and Save a new Admin
exports.create = (req, res) => {

    // Validate request
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Không để trống tên đăng nhập hoặc mật khẩu!"
        });
        return;
    }

    const myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    var password = myKey
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
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status
    };

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
    var id = req.params.id;

    Admin.findByPk(id)
        .then(data => {

            // var mykey = crypto.createDecipher('aes-128-cbc', process.env.SECRET_KEY);
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
    const myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    var id = req.params.id;
    // var password = myKey
    //     .update(req.body.password)
    //     .digest('hex');
    // Create a Admin
    const admin = {
        avatar: req.body.avatar,
        username: req.body.username,
        // password: password,
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
    var id = req.params.id;

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

// Update password Admin by the id in the request
exports.changePassword = (req, res) => {
    var id = req.body.id;
    var old_password = crypto.createHmac('sha256', process.env.SECRET_KEY)
        .update(req.body.old_password)
        .digest('hex');
    var new_password = crypto.createHmac('sha256', process.env.SECRET_KEY)
        .update(req.body.new_password)
        .digest('hex');

    Admin.findOne({
            where: {
                id: id,
                password: old_password
            }
        }).then(data => {

            if (data) {
                const admin = {
                    password: new_password
                };

                Admin.update(admin, {
                        where: {
                            id: id
                        }
                    })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Admin was updated password successfully."
                            });
                        } else {
                            res.send({
                                message: `Cannot update Admin password with id=${id}. Maybe Admin was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Admin with id=" + id
                        });
                    });

            } else {
                res.send('Old pass incorrect');

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Admin with id=" + id
            });
        });

};


// Update password Admin by the id in the request
exports.forgotPassword = (req, res) => {
    var username = req.body.username;
    var email = req.body.email;

    var condition = {
        username: username,
        email: email
    }
    // res.send(condition);



    Admin.findOne({
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
                    html: `<a href="${process.env.PORT_CLIENT}/admin/password-resets?email=${email}&token=${token}">Đặt lại mật khẩu</a>`
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
                                            res.send('Email sent: ' + info.response);

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
                                        res.send('Email sent: ' + info.response);

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
                message: err.message || "Some error occurred while retrieving Admin."
            });
        });




};



// Update password Admin by the id in the request
exports.forgotPassword = (req, res) => {
    var username = req.body.username;
    var email = req.body.email;


};