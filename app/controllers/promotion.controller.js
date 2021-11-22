const db = require("../models");
const Promotion = db.Promotions;
const Op = db.Sequelize.Op;

// Create and Save a new Promotion
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Promotion
    const promotion = {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        status: req.body.status,

    };

    // Save Promotion in the database
    Promotion.create(promotion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Promotion."
            });
        });
};

// Retrieve all Promotions from the database.
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

    Promotion.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving promotions."
            });
        });
};

// Find a single Promotion with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    Promotion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Promotion with id=" + id
            });
        });
};

// Update a Promotion by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    Promotion.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Promotion was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Promotion with id=${id}. Maybe Promotion was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Promotion with id=" + id
            });
        });
};

// Delete a Promotion with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    Promotion.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Promotion was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Promotion with id=${id}. Maybe Promotion was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Promotion with id=" + id
            });
        });
};

// Delete all Promotions from the database.
exports.deleteAll = (req, res) => {
    Promotion.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Promotions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all promotions."
            });
        });
};

// find all published Promotion
// exports.findAllPublished = (req, res) => {
//     Promotion.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving promotions."
//             });
//         });
// };