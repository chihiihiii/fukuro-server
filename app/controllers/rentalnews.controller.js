const db = require("../models");
const RentalNews = db.RentalNews;
const Op = db.Sequelize.Op;

// Create and Save a new RentalNews
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a RentalNews
    const rentalNews = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity,
        type: req.body.type,
        address: req.body.address,
        area: req.body.area,
        slug: req.body.slug,
        description: req.body.description,
        status: req.body.status,
        customerId: req.body.customer_id,
    };

    // Save RentalNews in the database
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

// Retrieve all RentalNewss from the database.
exports.findAll = (req, res) => {
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status
    };


    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    RentalNews.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rental News."
            });
        });
};

// Find a single RentalNews with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

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

// Update a RentalNews by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

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

// Delete a RentalNews with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

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

// Delete all RentalNewss from the database.
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

// Retrieve RentalNews latest from the database.
exports.findLatest = (req, res) => {
    var condition = {
        status: 1,
    };

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    RentalNews.findAndCountAll({
            where: condition,
            order: [
                ['created_at', 'DESC']
            ],
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rental News."
            });
        });


};


// Retrieve RentalNews priority from the database.
exports.findPriority = (req, res) => {

    var condition = {
        priority: 1,
        status: 1
    };

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    RentalNews.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rental News."
            });
        });


};


// Retrieve RentalNews by customer from the database.
exports.findByCustomerId = (req, res) => {
    var id = req.params.id;
    var condition = {
        customerId: id,
        status: 1,
    };

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    RentalNews.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rental News."
            });
        });


};


// find one RentalNews by Slug
exports.findOneBySlug = (req, res) => {
    var slug = req.params.slug;

    RentalNews.findOne({
            where: {
                slug: slug
            }
        }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RentalNews with slug=" + slug
            });
        });
};