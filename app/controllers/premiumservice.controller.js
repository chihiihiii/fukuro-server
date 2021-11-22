const db = require("../models");
const PremiumService = db.PremiumServices;
const Op = db.Sequelize.Op;

// Create and Save a new PremiumService
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a PremiumService
    const premiumService = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,

    };

    // Save PremiumService in the database
    PremiumService.create(premiumService)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the PremiumService."
            });
        });
};

// Retrieve all PremiumServices from the database.
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

    PremiumService.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving premium services."
            });
        });
};

// Find a single PremiumService with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    PremiumService.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving PremiumService with id=" + id
            });
        });
};

// Update a PremiumService by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    PremiumService.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PremiumService was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update PremiumService with id=${id}. Maybe PremiumService was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating PremiumService with id=" + id
            });
        });
};

// Delete a PremiumService with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    PremiumService.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PremiumService was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete PremiumService with id=${id}. Maybe PremiumService was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete PremiumService with id=" + id
            });
        });
};

// Delete all PremiumServices from the database.
exports.deleteAll = (req, res) => {
    PremiumService.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} PremiumServices were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all premiumservices."
            });
        });
};

// find all published PremiumService
// exports.findAllPublished = (req, res) => {
//     PremiumService.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving premiumservices."
//             });
//         });
// };