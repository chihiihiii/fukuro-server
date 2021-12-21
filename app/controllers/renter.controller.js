const db = require("../models");
const Renter = db.Renters;
const Rental = db.Rentals;
const RentalRoom = db.RentalRooms;
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
    if (req.body.rental_id && req.body.rental_room_id) {
        res.status(400).send({
            message: "Không thêm cả hai mã trọ và mã phòng trọ!"
        });
        return;
    }
    if (!req.body.customer_id) {
        res.status(400).send({
            message: "Không để trống mã người dùng!"
        });
        return;
    }

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
                    message: "Đã xảy ra một số lỗi khi truy xuất Rental Room!",
                    error: err.message
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
                    message: "Đã xảy ra một số lỗi khi truy xuất Rental Room!",
                    error: err.message
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
                    message: "Đã xảy ra một số lỗi khi tạo Renter!",
                    error: err.message
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
    var orderby = req.query.orderby;
    var order = [];
    if (orderby == 'desc') {
        order = [
            ['created_at', 'DESC']
        ];
    }
    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Renter.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit,
            include: [{
                    model: Rental,
                },
                {
                    model: RentalRoom,
                }
            ],
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất renters!",
                error: err.message
            });
        });
};

// Find a single Renter with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Renter.findAndCountAll({
            where: {
                id: id
            },
            include: [{
                    model: Rental,
                },
                {
                    model: RentalRoom,
                }
            ],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Renter with id=" + id,
                error: err.message
            });
        });
};

// Retrieve Rental by customer from the database.
exports.findByRentalId = (req, res) => {
    var id = req.params.id;
    var status = req.query.status;
    var condition = {
        rentalId: id,
    };

    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {}


    var orderby = req.query.orderby;
    var order = [];
    if (orderby == 'desc') {
        order = [
            ['created_at', 'DESC']
        ];
    }


    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Renter.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit,
            include: [{
                    model: Rental,
                },
                {
                    model: RentalRoom,
                }
            ],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving Rental News!",
                error: err
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
                    message: "Đã xảy ra một số lỗi khi truy xuất Rental Room!",
                    error: err.message
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
                    message: "Đã xảy ra một số lỗi khi truy xuất Rental Room!",
                    error: err.message
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
                        message: "Renter được cập nhật thành công!"
                    });
                } else {
                    res.send({
                        message: `Không thể cập nhật thông tin Renter with id=${id}. Maybe Renter was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Lỗi khi cập nhật Renter with id=" + id,
                    error: err.message
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
                    message: "Renter đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Renter with id=${id}. Maybe Renter was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Renter with id=" + id,
                error: err.message
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
                message: `${nums} Renters đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả renters!",
                error: err.message
            });
        });
};