const db = require("../models");
const Comment = db.Comments;
const Customer = db.Customers;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Comment
    var comment = {
        content: req.body.content,
        status: req.body.status,
        customerId: req.body.customer_id,
        blogId: req.body.blog_id,

    };

    // Save Comment in the database
    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Comment."
            });
        });
};

// Retrieve all Comments from the database.
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

    Comment.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Comments."
            });
        });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Comment.findByPk(id)
        .then(data => {
            if (data) {
                var customerId = data.dataValues.customerId;
                var comment_data = data.dataValues;

                Customer.findOne({
                        where: {
                            id: customerId,
                            // status: 1
                        },
                        attributes: ['username', 'first_name', 'last_name', 'email', 'avatar']
                    }).then(data => {

                        if (data) {

                            comment_data.customer_info = data.dataValues;

                            res.send(comment_data);

                        } else {
                            res.send('Not exist Comment for customer id=' + customerId);

                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error retrieving Comment with customer id=" + customerId + err
                        });
                    });


            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comment with err=" + err
            });
        });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

      // Update a Comment
      var comment = {
        content: req.body.content,
        status: req.body.status,
        customerId: req.body.customer_id,
        blogId: req.body.blog_id,

    };

    Comment.update(comment, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id
            });
        });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Comment.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
    Comment.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Comments were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all comments."
            });
        });
};

// Retrieve Comments by category from the database.
exports.findByBlogId = (req, res) => {
    var id = req.params.id;
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status,
        blog_id: id,
    };

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Comment.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {


            var commentData = data.rows;
            // var results = [];
            commentData.forEach((value, index, array) => {
                var customerId = commentData[index].customerId;

                console.log(customerId);


                Customer.findOne({
                        where: {
                            id: customerId,
                            status: 1
                        },
                        attributes: ['username', 'first_name', 'last_name', 'email', 'avatar']
                    }).then(data => {

                        // res.send(data);
                        // console.log(data.dataValues);
                        // console.log(commentData[index]);

                        if (data) {
                            commentData[index].dataValues.customer_info = data.dataValues;
                            console.log(commentData[index].dataValues);
                        }

                        if (index == array.length - 1) {
                            res.send(commentData);
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error retrieving Customer with id=" + customerId + err
                        });
                    });

            });

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Comments."
            });
        });


};