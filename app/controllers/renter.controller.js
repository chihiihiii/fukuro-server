const db = require("../models");
const Renter = db.Renters;
const Rental = db.Rentals;
const Op = db.Sequelize.Op;

// Create and Save a new Renter
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || (!req.body.rental_id && !req.body.rental_room_id)) {
        res.status(400).send({
            message: "Không để trống tên người trọ hoặc để trống mã trọ và mã phòng trọ!"
        });
        return;
    }
    // if (req.body.rental_id && req.body.rental_room_id) {
    //     res.status(400).send({
    //         message: "Không thêm cả hai mã trọ và mã phòng trọ!"
    //     });
    //     return;
    // }

    if (req.body.rental_id && !req.body.rental_room_id) {
        Rental.findOne({
                where: {
                    id: req.body.rental_id,
                    type: {
                        [Op.or]: [2, 3]
                    }
                }
            })
            .then(data => {
                // res.send(data);
                if (data) {

                    create();

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

    } else if (req.body.rental_id && req.body.rental_room_id) {

        Rental.findOne({
                where: {
                    id: req.body.rental_id,
                    type: 1
                }
            })
            .then(data => {
                // res.send(data);
                if (data) {

                    create();

                } else {

                    res.status(400).send({
                        message: 'Mã phòng trọ không tồn tại hoặc loại hình cho thuê không phù hợp!'
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Rental Room."
                });
            });

    } else {
        res.status(400).send({
            message: "Không thêm cả hai mã trọ và mã phòng trọ!"
        });
        return;
    }

    function create() {


        // Create a Renter
        var renter = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birth: req.body.birth,
            idNumber: req.body.id_number,
            deposit: req.body.deposit,
            period: req.body.period,
            paymentDate: req.body.payment_date,
            note: req.body.note,
            status: req.body.status,
            rentalId: req.body.rental_id,
            rentalRoomId: req.body.rental_room_id,
        };

        // Save Renter in the database
        Renter.create(renter)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Renter."
                });
            });

    }

};

// Retrieve all Renters from the database.
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

    Renter.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving renters."
            });
        });
};

// Find a single Renter with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Renter.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Renter with id=" + id
            });
        });
};

// Retrieve Rental by customer from the database.
exports.findByRentalId = (req, res) => {
    var id = req.params.id;
    var status = req.query.status;
    var condition = {
        rentalId : id,
    };

    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {}
    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Renter.findAndCountAll({
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

// Update a Renter by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    if (req.body.rental_id && !req.body.rental_room_id) {
        Rental.findOne({
                where: {
                    id: req.body.rental_id,
                    type: {
                        [Op.or]: [2, 3]
                    }
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

    } else if (req.body.rental_id && req.body.rental_room_id) {

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
                        message: 'Mã phòng trọ không tồn tại hoặc loại hình cho thuê không phù hợp!'
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

        // Update a Renter
        var renter = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birth: req.body.birth,
            idNumber: req.body.id_number,
            deposit: req.body.deposit,
            period: req.body.period,
            paymentDate: req.body.payment_date,
            note: req.body.note,
            status: req.body.status,
            rentalId: req.body.rental_id,
            rentalRoomId: req.body.rental_room_id,
        };

        Renter.update(renter, {
                where: {
                    id: id
                }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Renter was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Renter with id=${id}. Maybe Renter was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Renter with id=" + id
                });
            });

    }

};

// Delete a Renter with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Renter.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Renter was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Renter with id=${id}. Maybe Renter was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Renter with id=" + id
            });
        });
};

// Delete all Renters from the database.
exports.deleteAll = (req, res) => {
    Renter.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Renters were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all renters."
            });
        });
};

// find all published Renter
// exports.findAllPublished = (req, res) => {
//     Renter.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving renters."
//             });
//         });
// };
