const db = require("../models");
const RentalRoom = db.RentalRooms;
const Rental = db.Rentals;
const Op = db.Sequelize.Op;

// Create and Save a new RentalRoom
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.rental_id) {
        res.status(400).send({
            message: "Không để trống tên phòng trọ hoặc mã trọ!"
        });
        return;
    }

    Rental.findOne({
            where: {
                id: req.body.rental_id,
                type: 1
            }
        })
        .then(data => {
            // res.send(data);
            if (data) {

                // Create a RentalRoom
                var rentalRoom = {
                    name: req.body.name,
                    price: req.body.price,
                    area: req.body.area,
                    numberPeople: req.body.number_people,
                    vacancyDate: req.body.vacancy_date,
                    note: req.body.note,
                    status: req.body.status,
                    rentalId: req.body.rental_id,
                };

                // Save RentalRoom in the database
                RentalRoom.create(rentalRoom)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the RentalRoom."
                        });
                    });
            } else {

                res.status(400).send({
                    message: 'Mã trọ không tồn tại hoặc loại hình cho thuê không phù hợp!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rental Room."
            });
        });

};

// Retrieve all RentalRooms from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    }

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    RentalRoom.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rentalrooms."
            });
        });
};

// Find a single RentalRoom with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    RentalRoom.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RentalRoom with id=" + id
            });
        });
};

// Update a RentalRoom by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    if (req.body.rental_id) {
        Rental.findOne({
                where: {
                    id: req.body.rental_id,
                    type: 1
                }
            })
            .then(data => {
                // res.send(data);
                if (data) {

                    update();

                } else {

                    res.status(400).send({
                        message: 'Mã trọ không tồn tại hoặc loại hình cho thuê không phù hợp!'
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Rental Room."
                });
            });

    } else {
        update();
    }

    function update() {

        // Update a RentalRoom
        var rentalRoom = {
            name: req.body.name,
            price: req.body.price,
            area: req.body.area,
            numberPeople: req.body.number_people,
            vacancyDate: req.body.vacancy_date,
            note: req.body.note,
            status: req.body.status,
            rentalId: req.body.rental_id,
        };

        RentalRoom.update(rentalRoom, {
                where: {
                    id: id
                }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "RentalRoom was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update RentalRoom with id=${id}. Maybe RentalRoom was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating RentalRoom with id=" + id
                });
            });

    }

};

// Delete a RentalRoom with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    RentalRoom.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "RentalRoom was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete RentalRoom with id=${id}. Maybe RentalRoom was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete RentalRoom with id=" + id
            });
        });
};

// Delete all RentalRooms from the database.
exports.deleteAll = (req, res) => {
    RentalRoom.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} RentalRooms were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all rentalrooms."
            });
        });
};

// find all published RentalRoom
// exports.findAllPublished = (req, res) => {
//     RentalRoom.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving rentalrooms."
//             });
//         });
// };