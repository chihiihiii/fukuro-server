const db = require("../models");
const Rental = db.Rentals;
const Op = db.Sequelize.Op;

// Create and Save a new Rental
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Rental
    const rental = {
        name: req.body.name,
        price: req.body.price,
        renter: req.body.renter,
        note: req.body.note,
        status: req.body.status,
    };

    // Save Rental in the database
    Rental.create(rental)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Rental."
            });
        });
};

// Retrieve all Rentals from the database.
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

    Rental.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rentals."
            });
        });
};

// Find a single Rental with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    Rental.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Rental with id=" + id
            });
        });
};

// Update a Rental by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    Rental.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Rental with id=${id}. Maybe Rental was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Rental with id=" + id
            });
        });
};

// Delete a Rental with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    Rental.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Rental with id=${id}. Maybe Rental was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Rental with id=" + id
            });
        });
};

// Delete all Rentals from the database.
exports.deleteAll = (req, res) => {
    Rental.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Rentals were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all rentals."
            });
        });
};

// find all published Rental
// exports.findAllPublished = (req, res) => {
//     Rental.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving rentals."
//             });
//         });
// };