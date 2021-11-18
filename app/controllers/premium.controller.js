const db = require("../models");
const Premium = db.Premiums;
const Op = db.Sequelize.Op;

// Create and Save a new Premium
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Premium
    const premium = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,

    };

    // Save Premium in the database
    Premium.create(premium)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Premium."
            });
        });
};

// Retrieve all Premiums from the database.
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

    Premium.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving premiums."
            });
        });
};

// Find a single Premium with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Premium.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Premium with id=" + id
            });
        });
};

// Update a Premium by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Premium.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Premium was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Premium with id=${id}. Maybe Premium was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Premium with id=" + id
            });
        });
};

// Delete a Premium with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Premium.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Premium was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Premium with id=${id}. Maybe Premium was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Premium with id=" + id
            });
        });
};

// Delete all Premiums from the database.
exports.deleteAll = (req, res) => {
    Premium.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Premiums were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all premiums."
            });
        });
};

// find all published Premium
// exports.findAllPublished = (req, res) => {
//     Premium.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving premiums."
//             });
//         });
// };