const db = require("../models");
const RentalNews = db.RentalNews;
const Op = db.Sequelize.Op;

// Create and Save a new RentalNews
exports.create = (req, res) => {
    // Validate request
    if (!req.body.lat || !req.body.lng) {
        res.status(400).send({
            message: "Không để trống vĩ độ và kinh độ!"
        });
        return;
    }

    if (!req.body.name || !req.body.slug) {
        res.status(400).send({
            message: "Không để trống tên tin cho thuê!"
        });
        return;
    }

    RentalNews.findOne({
            where: {
                slug: req.body.slug
            }
        }).then(data => {
            if (data) {
                res.status(400).send({
                    message: "Slug đã tồn tại. Vui lòng chọn tên khác!"
                });
            } else {
                // Create a RentalNews
                var rentalNews = {
                    name: req.body.name,
                    image: req.body.image,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    type: req.body.type,
                    address: req.body.address,
                    streetNumber: req.body.street_number,
                    street: req.body.street,
                    district: req.body.district,
                    city: req.body.city,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    area: req.body.area,
                    slug: req.body.slug,
                    priority: req.body.priority,
                    description: req.body.description,
                    status: req.body.status,
                    promotionId: req.body.promotion_id,
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
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Question with slug=" + slug
            });
        });


};

// Retrieve all RentalNewss from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }

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

    if (req.body.slug) {
        RentalNews.findOne({
                where: {
                    slug: req.body.slug
                }
            }).then(data => {
                if (data) {
                    if (data.id == parseInt(id)) {
                        update();
                    } else {
                        res.status(400).send({
                            message: "Slug đã tồn tại. Vui lòng chọn tên khác!"
                        });
                    }
                } else {
                    update();
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Question with slug=" + slug
                });
            });

    } else {
        update();
    }


    function update() {

        var rentalNews = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            quantity: req.body.quantity,
            type: req.body.type,
            address: req.body.address,
            streetNumber: req.body.street_number,
            street: req.body.street,
            district: req.body.district,
            city: req.body.city,
            lat: req.body.lat,
            lng: req.body.lng,
            area: req.body.area,
            slug: req.body.slug,
            priority: req.body.priority,
            description: req.body.description,
            status: req.body.status,
            promotionId: req.body.promotion_id,
            customerId: req.body.customer_id,
        };

        RentalNews.update(rentalNews, {
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


    }



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

    var status = req.query.status;

    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }

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
    var status = req.query.status;

    var condition = {
        priority: 1,
    };
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }

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
    var status = req.query.status;
    var condition = {
        customerId: id,
    };

    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }
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