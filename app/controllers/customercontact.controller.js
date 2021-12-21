const db = require("../models");
const CustomerContact = db.CustomerContacts;
const CustomerNotification = db.CustomerNotifications;
const Customer = db.Customers;
const RentalNews = db.RentalNews;
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const Op = db.Sequelize.Op;

// Create and Save a new CustomerContact
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name || !req.body.first_name) {
        res.status(400).send({
            message: "Không để trống tên!"
        });
        return;
    }

    if (!req.body.detail_url) {
        res.status(400).send({
            message: "Không để trống đường dẫn chi tiết của thông báo!"
        });
        return;
    }



    // Create a CustomerContact
    var customerContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        status: req.body.status,
        customerId: req.body.customer_id,
        rentalNewsId: req.body.rental_news_id,

    };
    var arr = {};
    var detailUrl = req.body.detail_url;
    var customerId = req.body.customer_id;
    var rentalNewsId = req.body.retail_news_id;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SEND_MAIL_USER,
            pass: process.env.SEND_MAIL_PASS
        }
    });

    Customer.findByPk(req.body.customer_id)
        .then(data => {
            arr.email = data.email;
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Customer with id=" + customerId,
                error: err.message
            });
        });

    // Save CustomerContact in the database
    CustomerContact.create(customerContact)
        .then(data => {
            // res.send(data);

            if (data) {

                detailUrl+=data.dataValues.id;

                var message = 'Bạn có một liên hệ mới!'
                var customerNotification = {
                    message: message,
                    detailUrl: detailUrl,
                    customerId: customerId,
                    rentalNewsId: rentalNewsId,
        
                };
        
                // Save CustomerNotification in the database
                CustomerNotification.create(customerNotification)
                    .then(dataNotification => {
                        ejs.renderFile(process.cwd() + "/email-templates/notification.ejs", arr, {}, function (err, str) {
                            if (err) {
                                console.log(err);
                            } else {
                                var mailOptions = {
                                    from: process.env.SEND_MAIL_USER,
                                    to: arr.email,
                                    subject: "Fukuro - Liên hệ mới từ "+customerContact.firstName,
                                    html: str,
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        res.send(error);
                                    }
                                });
                            }

                        });
                        res.send({
                            data: data,
                            dataNotification: dataNotification
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Đã xảy ra một số lỗi khi tạo Customer Notification!",
                            error: err.message
                        });
                    });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Customer Contact!",
                error: err.message
            });
        });

};

// Retrieve all CustomerContacts from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
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

    CustomerContact.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit,
            include: [{
                model: Customer,
                attributes: ['username', 'first_name', 'last_name', 'email', 'avatar']
            },
            {
                model: RentalNews,
            }
        ],
        raw: true,
        nest: true
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Customer Contacts!",
                error: err.message
            });
        });
};

// Retrieve all CustomerPremiumServices by customer id from the database.
exports.findByCustomerId = (req, res) => {
    var id = req.params.id;


    var status = req.query.status;
    var condition = {
        customerId: id
    };
    if (status == 0 || status == 1 || status == 2) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
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

    CustomerContact.findAndCountAll({
        where: condition,
        order: order,
        offset: offset,
        limit: limit,
        raw: true,
        nest: true
    })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất customer premiums!",
                error: err.message
            });
        });
};

// Find a single CustomerContact with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    CustomerContact.findOne({
        where: {
            id:id
        },
        include: [{
            model: Customer,
            attributes: ['username', 'first_name', 'last_name', 'email', 'avatar']
        },
        {
            model: RentalNews,
        }
    ],
    raw: true,
    nest: true
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Customer Contact with id=" + id,
                error: err.message
            });
        });
};

// Update a CustomerContact by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;


    // Update a CustomerContact
    var customerContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        status: req.body.status,
        customerId: req.body.customer_id,
        rentalNewsId: req.body.rental_news_id,

    };

    CustomerContact.update(customerContact, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Contact được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Customer Contact with id=${id}. Maybe Customer Contact was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Customer Contact with id=" + id,
                error: err.message
            });
        });
};

// Delete a CustomerContact with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    CustomerContact.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Contact đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Customer Contact with id=${id}. Maybe CustomerContact was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Customer Contact with id=" + id,
                error: err.message
            });
        });
};

// Delete all CustomerContacts from the database.
exports.deleteAll = (req, res) => {
    CustomerContact.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Customer Contacts đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả customer contacts!",
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

    var arr = {};
    arr.message = message;

    ejs.renderFile(process.cwd() + "/email-templates/feedback.ejs", arr, {}, function (err, str) {
        if (err) {
            console.log(err);
        } else {
            var mailOptions = {
                from: process.env.SEND_MAIL_USER,
                to: email,
                subject: subject,
                html: str,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send(error);
                } else {
                    var customerContact = {
                        status: 1,
                        customerId: req.body.customer_id,
                    }
                    CustomerContact.update(customerContact, {
                        where: {
                            id: id
                        }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "CustomerContact sent feedback successfully!",
                                    status: 'Success'
                                });
                            } else {
                                res.send({
                                    message: `Không thể cập nhật status CustomerContact với id=${id}. Maybe CustomerContact was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Lỗi khi cập nhật status CustomerContact với id=" + id,
                                error: err.message

                            });
                        });


                }
            });
        }

    });

};
