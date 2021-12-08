const db = require("../models");
const QuestionCategory = db.QuestionCategories;
const Op = db.Sequelize.Op;

// Create and Save a new QuestionCategory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Không để trống tên loại câu hỏi!"
        });
        return;
    }
    var questionCategory = {
        name: req.body.name,
        slug: req.body.slug,
        status: req.body.status,

    };



    QuestionCategory.findOne({
            where: {
                slug: req.body.slug
            }
        }).then(data => {
            if (data) {
                res.status(400).send({
                    message: "Slug đã tồn tại. Vui lòng chọn tên khác!"
                });
            } else {
                // Create a QuestionCategory
                var questionCategory = {
                    name: req.body.name,
                    slug: req.body.slug,
                    status: req.body.status,

                };

                // Save QuestionCategory in the database
                QuestionCategory.create(questionCategory)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Question Category."
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

// Retrieve all QuestionCategory from the database.
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

    QuestionCategory.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Question Categories."
            });
        });
};

// Find a single QuestionCategory with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    QuestionCategory.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Question Category with id=" + id
            });
        });
};

// Update a QuestionCategory by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    if (req.body.slug) {
        QuestionCategory.findOne({
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


        var questionCategory = {
            name: req.body.name,
            slug: req.body.slug,
            status: req.body.status,

        };
        QuestionCategory.update(questionCategory, {
                where: {
                    id: id
                }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Question Category was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Question Category with id=${id}. Maybe Question Category was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Question Category with id=" + id
                });
            });

    }





};

// Delete a QuestionCategory with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    QuestionCategory.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Question Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Question Category with id=${id}. Maybe Question Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Question Category with id=" + id
            });
        });
};

// Delete all QuestionCategory from the database.
exports.deleteAll = (req, res) => {
    QuestionCategory.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Question Categories were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all question categories."
            });
        });
};

// find one QuestionCategory by Slug
exports.findOneBySlug = (req, res) => {
    var slug = req.params.slug;
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status,
        slug: slug
    };
    QuestionCategory.findOne({
            where: condition
        }).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.send(`Không tồn tại loại câu hỏi với slug = ${slug} hoặc loại câu hỏi đã bị vô hiệu hóa!`)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Question Category with slug=" + slug
            });
        });
};