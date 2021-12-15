const db = require("../models");
const AdminContact = db.AdminContacts;
const Admin = db.Admins;
const Op = db.Sequelize.Op;

const nodemailer = require('nodemailer');
// Create and Save a new AdminContact
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a AdminContact
    var adminContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
        status: req.body.status,

    };

    // Save AdminContact in the database
    AdminContact.create(adminContact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo AdminContact!"
            });
        });
};

// Retrieve all AdminContacts from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    var condition = {

    };
    if (status == 0 || status == 1) {
        condition.status = status
    }

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    AdminContact.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất AdminContact!",
                error: err.message

            });
        });
};

// Find a single AdminContact with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    AdminContact.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất AdminContact với id=" + id,
                error: err.message

            });
        });
};

// Update a AdminContact by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    // Update a AdminContact
    var adminContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
        status: req.body.status,
        adminId: req.body.admin_id,


    };

    AdminContact.update(adminContact, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AdminContact được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin AdminContact với id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật AdminContact với id=" + id,
                error: err.message

            });
        });
};

// Delete a AdminContact with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    AdminContact.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AdminContact đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa AdminContact với id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa AdminContact với id=" + id,
                error: err.message

            });
        });
};

// Delete all AdminContacts from the database.
exports.deleteAll = (req, res) => {
    AdminContact.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} AdminContacts đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả admincontacts!",
                error: err.message

            });
        });
};

// Request contact form
exports.requestContact = (req, res) => {
    var id = req.params.id;

    // Validate request
    if (!req.body.subject || !req.body.message || !req.body.email) {
        res.status(400).send({
            message: "Không để trống chủ đề, nội dung hoặc email!"
        });
        return;
    }


    var subject = req.body.subject;
    var message = req.body.message;
    var email = req.body.email;

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
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log(error);
            res.send(error);
        } else {
            // console.log('Email sent: ' + info.response);
            // res.send('Success');
            var adminContact = {
                status: 1,
                adminId: req.body.admin_id,

            }

            AdminContact.update(adminContact, {
                    where: {
                        id: id
                    }
                })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: "AdminContact was updated status successfully!",
                            status: 'Success'
                        });
                    } else {
                        res.send({
                            message: `Không thể cập nhật status AdminContact với id=${id}. Maybe AdminContact was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Lỗi khi cập nhật status AdminContact với id=" + id,
                        error: err.message

                    });
                });


        }
    });


};