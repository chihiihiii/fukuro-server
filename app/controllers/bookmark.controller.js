const db = require("../models");
const Bookmark = db.Bookmarks;
const RentalNews = db.RentalNews;
const Op = db.Sequelize.Op;

// update Bookmark by Customer id 
exports.updateByCustomerId = (req, res) => {
    // Validate request

    if (!req.params.id) {
        res.status(400).send({
            message: "Không để trống id tài khoản người dùng!"
        });
        return;
    }

    var customerId = req.params.id;
    var rentalNews = req.body.rental_news;
    var flag = false;

    Bookmark.findOne({
            where: {
                customer_id: customerId,
            }
        }).then(data => {

            if (data) {
                var rentalNewsArray = data.rentalNews.split(',');

                if (rentalNewsArray.includes(rentalNews)) {
                    var index = rentalNewsArray.indexOf(rentalNews);
                    rentalNewsArray.splice(index, 1);
                    if(rentalNewsArray.length === 0){
                        flag = true;
                    }
                } else {
                    rentalNewsArray.push(rentalNews);
                    // Create a Bookmark

                    // res.send(bookmark);
                }
                var bookmark = {
                    rentalNews: rentalNewsArray.toString(),
                };
                Bookmark.update(bookmark, {
                        where: {
                            customer_id: customerId
                        }
                    })
                    .then(num => {
                        if (num == 1) {
                            if(flag == true){
                                Bookmark.destroy({
                                    where: {
                                        customer_id: customerId
                                    }
                                });
                                res.send({
                                    message: "empty"
                                });
                            }else{
                                res.send({
                                    message: "Bookmark được cập nhật thành công!"
                                });
                            }
                        } else {
                            res.send({
                                message: `Không thể cập nhật thông tin Bookmark with customer_id=${customerId}. Maybe Bookmark was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Lỗi khi cập nhật Bookmark with customer_id=" + customerId,
                            error: err.message
                        });
                    });



            } else {
                // Create and Save a new Bookmark (if not exist)
                // Create a Bookmark
                // res.send(customerId);
                var bookmark = {
                    customerId: customerId,
                    rentalNews: rentalNews,
                };
                // res.send(bookmark);
                // Save Bookmark in the database
                Bookmark.create(bookmark)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Đã xảy ra một số lỗi khi tạo Bookmark!",
                            error: err.message
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Bookmark with customer id=" + customerId,
                error: err.message
            });
        });



};

// Retrieve all Bookmarks from the database.
exports.findAll = (req, res) => {
    // var status = +req.query.status;
    // status = (status == 'both') ? null : 1;
    // var condition = {
    //     status: status
    // };

    var condition = null;
    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Bookmark.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);


        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất bookmarks!",
                error: err.message
            });
        });
};

// Find a single Bookmark with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Bookmark.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Bookmark with id=" + id,
                error: err.message
            });
        });
};


// Delete a Bookmark with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Bookmark.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Bookmark đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Bookmark with id=${id}. Maybe Bookmark was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Bookmark with id=" + id,
                error: err.message
            });
        });
};

// Delete all Bookmarks from the database.
exports.deleteAll = (req, res) => {
    Bookmark.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Bookmarks đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả bookmarks!",
                error: err.message
            });
        });
};

// Delete a Bookmark with customer id
exports.deleteAllByCustomerId = (req, res) => {
    var customerId = req.params.id;

    Bookmark.destroy({
            where: {
                customerId: customerId
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Bookmark đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Bookmark with id=${id}. Maybe Bookmark was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Bookmark with id=" + id,
                error: err.message
            });
        });
};

// find Bookmark By customer is
exports.findAllByCustomerId = (req, res) => {
    // var rentalNewsArray = data.rentalNews.split(',');
    var customerId = req.params.id;

    Bookmark.findOne({
            where: {
                customer_id: customerId,
            }
        }).then(data => {

            if (data) {
                if (data.rentalNews) {
                    var rentalNewsArray = data.rentalNews.split(',');

                    var results = [];
                    rentalNewsArray.forEach((value, index, array) => {
                        RentalNews.findOne({
                                where: {
                                    id: parseInt(value),
                                    status: 1
                                }
                            }).then(data => {

                                if (data) {
                                    results.push(data);
                                }

                                if (index == array.length - 1) {
                                    res.send(results);
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Lỗi khi truy xuất Rental News with id=" + i,
                                    error: err.message
                                });
                            });

                    });
                } else {
                    res.status(500).send({
                        message: "Rental News null with customer id=" + customerId,
                        error: err.message
                    });
                }




            } else {
                res.send('Not exist Bookmark for customer id=' + customerId);

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Bookmark with customer id=" + customerId,
                error: err.message
            });
        });


};
