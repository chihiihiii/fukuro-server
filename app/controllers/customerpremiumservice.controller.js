const db = require("../models");
const CustomerPremiumService = db.CustomerPremiumServices;
const Op = db.Sequelize.Op;

// Create and Save a new CustomerPremiumService
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a CustomerPremiumService
    const customerPremiumService = {
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        status: req.body.status,

    };

    // Save CustomerPremiumService in the database
    CustomerPremiumService.create(customerPremiumService)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer Premium."
            });
        });
};

// Retrieve all CustomerPremiumServices from the database.
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

    CustomerPremiumService.findAndCountAll({
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

// Find a single CustomerPremiumService with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    CustomerPremiumService.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer Premium with id=" + id
            });
        });
};

// Update a CustomerPremiumService by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    CustomerPremiumService.update(req.body, {
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

// Delete a CustomerPremiumService with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    CustomerPremiumService.destroy({
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

// Delete all CustomerPremiumServices from the database.
exports.deleteAll = (req, res) => {
    CustomerPremiumService.destroy({
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

// find all published CustomerPremiumService
// exports.findAllPublished = (req, res) => {
//     CustomerPremiumService.findAll({
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