const db = require("../models");
const RentalNews = db.RentalNews;
const Op = db.Sequelize.Op;

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Admin
    const rentalNews = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity,
        type: req.body.type,
        address: req.body.address,
        description: req.body.description,
        status: req.body.status,
        
    };

    // Save Admin in the database
    RentalNews.create(rentalNews)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Rental News."
            });
        });
};

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
    // const username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition=null;

    RentalNews.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rental news."
            });
        });
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    RentalNews.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Rental News with id=" + id
            });
        });
};

// Update a Admin by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    RentalNews.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental News was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Rental News with id=${id}. Maybe Rental News was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Rental News with id=" + id
            });
        });
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    RentalNews.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental News was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Rental News with id=${id}. Maybe Rental News was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Rental News with id=" + id
            });
        });
};

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
    RentalNews.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Rental News were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all rental news."
            });
        });
};

// find all published Admin
// exports.findAllPublished = (req, res) => {
//     RentalNews.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving rental news."
//             });
//         });
// };