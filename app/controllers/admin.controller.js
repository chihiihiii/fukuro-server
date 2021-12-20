const db = require("../models");
const Admin = db.Admins;
const PasswordReset = db.PasswordResets;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ejs = require('ejs');


// Admin login
exports.login = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Không để trống tên đăng nhập hoặc mật khẩu!"
        });
        return;
    }

    var myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    var username = req.body.username;
    // var password = req.body.password;
    var password = myKey
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
                message: "Đã xảy ra một số lỗi khi truy xuất Admin!",
                error: err.message
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

    Admin.findOne({
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
                message: "Đã xảy ra một số lỗi khi truy xuất Admin!",
                error: err.message
            });
        });

    Admin.findOne({
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
                message: "Đã xảy ra một số lỗi khi truy xuất Admin!",
                error: err.message
            });
        });


    var myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    var password = myKey
        .update(req.body.password)
        .digest('hex');

    // Create a Admin
    var admin = {
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
                message: "Đã xảy ra một số lỗi khi tạo Admin!",
                error: err.message
            });
        });




};

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    var condition = {

    };
    if (status == 0 || status == 1) {
        condition.status = status
    }

    var orderby = req.query.orderby;
    var order = [];
    if (orderby == 'desc') {
        order = [
            ['created_at', 'DESC']
        ];
    }



    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Admin.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Admin!",
                error: err.message
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
                message: "Lỗi khi truy xuất Admin với id=" + id,
                error: err.message
            });
        });
};

// Update a Admin by the id in the request
exports.update = (req, res) => {
    var myKey = crypto.createHmac('sha256', process.env.SECRET_KEY);
    var id = req.params.id;
    // var password = myKey
    //     .update(req.body.password)
    //     .digest('hex');
    // Update a Admin
    var admin = {
        avatar: req.body.avatar,
        username: req.body.username,
        // password: password,
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        role: req.body.role,
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
                    message: "Cập nhật thông tin Admin thành công"
                });
            } else {
                res.send({
                    message: 'Không thể cập nhật thông tin Admin với id=' + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Admin với id=" + id,
                error: err.message
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
                    message: "Admin đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Admin vớiid=${id}. Maybe Admin was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Admin với id=" + id,
                error: err.message
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
                message: `${nums} Admins đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả admins!",
                error: err.message
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
                var admin = {
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
                                message: "Cập nhật mật khẩu thành công!"
                            });
                        } else {
                            res.send({
                                message: `Không thể cập nhật thông tin Admin password with id=${id}. Maybe Admin was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Lỗi khi cập nhật Admin với id=" + id,
                            error: err.message
                        });
                    });

            } else {
                res.send('Old pass incorrect');

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Admin với id=" + id,
                error: err.message
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

    var arr = {};

    Admin.findOne({
            where: condition
        })
        .then(data => {
            arr = data.dataValues;
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

                // var mailOptions = {
                //     from: process.env.SEND_MAIL_USER,
                //     to: email,
                //     subject: 'Reset Password for ' + username,
                //     // text: 'hahahaha',
                //     html: `<a href="${process.env.PORT_CLIENT}/auth/reset-password?email=${email}&token=${token}">Đặt lại mật khẩu</a>`
                // };

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
                                    arr.mail = email;
                                    arr.token = token;
                                    arr.link = process.env.PORT_ADMIN + '/auth/reset-password';
                                    ejs.renderFile(process.cwd() + "/email-templates/forgot-password.mail.ejs", arr, {}, function (err, str) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            var mainOptions = {
                                                from: process.env.SEND_MAIL_USER,
                                                to: email,
                                                subject: 'FUKURO - YÊU CẦU ĐẶT LẠI MẬT KHẨU',
                                                html: str
                                            };
                                            transporter.sendMail(mainOptions, function (err, info) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    res.send('Success');
                                                }
                                            });
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
                                    message: "Đã xảy ra một số lỗi khi tạo Password Reset!",
                                    error: err.message
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

                                arr.mail = passwordReset.email;
                                arr.token = passwordReset.token;
                                arr.link = process.env.PORT_ADMIN + '/auth/reset-password';
                                ejs.renderFile(process.cwd() + "/email-templates/forgot-password.mail.ejs", arr, {}, function (err, str) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var mainOptions = {
                                            from: process.env.SEND_MAIL_USER,
                                            to: email,
                                            subject: 'FUKURO - YÊU CẦU ĐẶT LẠI MẬT KHẨU',
                                            html: str
                                        };
                                        transporter.sendMail(mainOptions, function (err, info) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                res.send('Success');
                                            }
                                        });
                                    }

                                });

                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Đã xảy ra một số lỗi khi tạo Password Reset!",
                                    error: err.message
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
                message: "Đã xảy ra một số lỗi khi truy xuất Admin!",
                error: err.message
            });
        });




};