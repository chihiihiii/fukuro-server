const db = require("../models");
const PasswordReset = db.PasswordResets;
const Customer = db.Customers;
const Admin = db.Admins;
const Op = db.Sequelize.Op;
const crypto = require('crypto');



// Update a PasswordReset for customer
exports.customerPasswordReset = (req, res) => {

    if (!req.body.email || !req.body.token || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var email = req.body.email;
    var token = req.body.token;

    PasswordReset.findOne({
        where: {
            email: email,
            token: token
        }
    }).then(data => {

        if (data) {

            var password = crypto.createHmac('sha256', process.env.SECRET_KEY)
                .update(req.body.password)
                .digest('hex');

            var customer = {
                password: password
            }
            Customer.update(customer, {
                    where: {
                        email: email
                    }
                })
                .then(num => {
                    if (num == 1) {

                        PasswordReset.destroy({
                                where: {
                                    email: email
                                }
                            })
                            .then(num => {
                                if (num == 1) {
                                    res.send({
                                        message: "Password Reset was updated successfully, Token đã được xóa thành công!"
                                    });
                                } else {
                                    res.send({
                                        message: `Không thể xóa token with email=${email}. Maybe Password Reset was not found!`
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Không thể xóa Password Reset with id=" + id,
                                    error: err.message
                                });
                            });

                    } else {
                        res.send({
                            message: `Không thể cập nhật thông tin Password Reset with id=${id}. Maybe Password Reset was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Lỗi khi cập nhật PasswordReset with id=" + id,
                        error: err.message
                    });
                });


        }


    }).catch(err => {
        res.status(500).send({
            message: "Đã xảy ra một số lỗi khi truy xuất Password Resets!",
            error: err.message
        });
    });



};

// Update a PasswordReset for admin
exports.adminPasswordReset = (req, res) => {

    if (!req.body.email || !req.body.token || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var email = req.body.email;
    var token = req.body.token;

    PasswordReset.findOne({
        where: {
            email: email,
            token: token
        }
    }).then(data => {

        if (data) {

            var password = crypto.createHmac('sha256', process.env.SECRET_KEY)
                .update(req.body.password)
                .digest('hex');

            var admin = {
                password: password
            }
            Admin.update(admin, {
                    where: {
                        email: email
                    }
                })
                .then(num => {
                    if (num == 1) {

                        PasswordReset.destroy({
                                where: {
                                    email: email
                                }
                            })
                            .then(num => {
                                if (num == 1) {
                                    res.send({
                                        message: "Password Reset was updated successfully, Token đã được xóa thành công!"
                                    });
                                } else {
                                    res.send({
                                        message: `Không thể xóa token with email=${email}. Maybe Password Reset was not found!`
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Không thể xóa Password Reset with id=" + id,
                                    error: err.message
                                });
                            });

                    } else {
                        res.send({
                            message: `Không thể cập nhật thông tin Password Reset with id=${id}. Maybe Password Reset was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Lỗi khi cập nhật PasswordReset with id=" + id,
                        error: err.message
                    });
                });


        }


    }).catch(err => {
        res.status(500).send({
            message: "Đã xảy ra một số lỗi khi truy xuất Password Resets!",
            error: err.message
        });
    });



};



// Delete all PasswordResets from the database.
exports.deleteAll = (req, res) => {
    PasswordReset.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Password Reset đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả password resets!",
                error: err.message
            });
        });
};