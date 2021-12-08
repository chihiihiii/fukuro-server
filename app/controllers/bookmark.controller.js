const db = require("../models");
const Bookmark = db.Bookmarks;
const RentalNews = db.RentalNews;
const Op = db.Sequelize.Op;

// update Bookmark by Customer id 
exports.updateByCustomerId = (req, res) => {
    // Validate request
    if (!req.query.customer_id) {
        res.status(400).send({
            message: "Không để trống id tài khoản người dùng!"
        });
        return;
    }

    var customerId = req.params.id;
    var rentalNews = req.body.rental_news;


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
                            res.send({
                                message: "Bookmark was updated successfully."
                            });
                        } else {
                            res.send({
                                message: `Cannot update Bookmark with customer_id=${customerId}. Maybe Bookmark was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Bookmark with customer_id=" + customerId
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
                            message: err.message || "Some error occurred while creating the Bookmark."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Bookmark with customer id=" + customerId
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
                message: err.message || "Some error occurred while retrieving bookmarks."
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
                message: "Error retrieving Bookmark with id=" + id
            });
        });
};

// Update a Bookmark by the id in the request
// exports.update = (req, res) => {
//     var id = req.params.id;

//     Bookmark.update(req.body, {
//             where: {
//                 id: id
//             }
//         })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Bookmark was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update Bookmark with id=${id}. Maybe Bookmark was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Bookmark with id=" + id
//             });
//         });
// };

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
                    message: "Bookmark was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Bookmark with id=${id}. Maybe Bookmark was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Bookmark with id=" + id
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
                message: `${nums} Bookmarks were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all bookmarks."
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
                    message: "Bookmark was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Bookmark with id=${id}. Maybe Bookmark was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Bookmark with id=" + id
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
                                    message: "Error retrieving Rental News with id=" + i + err
                                });
                            });

                    });
                }else{
                    res.status(500).send({
                        message: "Rental News null with customer id=" + customerId 
                    });
                }




            } else {
                res.send('Not exist Bookmark for customer id=' + customerId);

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Bookmark with customer id=" + customerId + err
            });
        });


};