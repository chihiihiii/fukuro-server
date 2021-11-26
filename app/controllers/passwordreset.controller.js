const db = require("../models");
const PasswordReset = db.PasswordResets;
const Customer = db.Customers;
const Admin = db.Admins;
const Op = db.Sequelize.Op;




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
                                        message: "Password Reset was updated successfully, Token was deleted successfully!"
                                    });
                                } else {
                                    res.send({
                                        message: `Cannot delete token with email=${email}. Maybe Password Reset was not found!`
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Could not delete Password Reset with id=" + id
                                });
                            });

                    } else {
                        res.send({
                            message: `Cannot update Password Reset with id=${id}. Maybe Password Reset was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating PasswordReset with id=" + id
                    });
                });


        }


    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Password Resets."
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
                                        message: "Password Reset was updated successfully, Token was deleted successfully!"
                                    });
                                } else {
                                    res.send({
                                        message: `Cannot delete token with email=${email}. Maybe Password Reset was not found!`
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Could not delete Password Reset with id=" + id
                                });
                            });

                    } else {
                        res.send({
                            message: `Cannot update Password Reset with id=${id}. Maybe Password Reset was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating PasswordReset with id=" + id
                    });
                });


        }


    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Password Resets."
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
                message: `${nums} Password Reset were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all password resets."
            });
        });
};