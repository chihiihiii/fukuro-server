const db = require("../models");
const CustomerPremium = db.CustomerPremiums;
const Op = db.Sequelize.Op;

// Create and Save a new CustomerPremium
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a CustomerPremium
    const customerPremium = {
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        status: req.body.status,

    };

    // Save CustomerPremium in the database
    CustomerPremium.create(customerPremium)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer Premium."
            });
        });
};

// Retrieve all CustomerPremiums from the database.
exports.findAll = (req, res) => {
    // const username = req.query.username;
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

    CustomerPremium.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customer premiums."
            });
        });
};

// Find a single CustomerPremium with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CustomerPremium.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer Premium with id=" + id
            });
        });
};

// Update a CustomerPremium by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    CustomerPremium.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Premium was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer Premium with id=${id}. Maybe Customer Premium was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer Premium with id=" + id
            });
        });
};

// Delete a CustomerPremium with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    CustomerPremium.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Premium was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer Premium with id=${id}. Maybe Customer Premium was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer Premium with id=" + id
            });
        });
};

// Delete all CustomerPremiums from the database.
exports.deleteAll = (req, res) => {
    CustomerPremium.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Customer Premiums were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all customer premiums."
            });
        });
};

// find all published CustomerPremium
// exports.findAllPublished = (req, res) => {
//     CustomerPremium.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving customer premiums."
//             });
//         });
// };