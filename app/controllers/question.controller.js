const db = require("../models");
const Question = db.Questions;
const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.slug) {
        res.status(400).send({
            message: "Không để trống tựa câu hỏi!"
        });
        return;
    }

    Question.findOne({
            where: {
                slug: req.body.slug
            }
        }).then(data => {
            if (data) {
                res.status(400).send({
                    message: "Slug đã tồn tại. Vui lòng chọn tên khác!"
                });
            } else {
                // Create a Question
                const question = {
                    title: req.body.title,
                    slug: req.body.slug,
                    content: req.body.content,
                    status: req.body.status,
                    questionCategoryId: req.body.question_category_id,
                    customerId: req.body.customer_id
                };
                // console.log(question);

                // Save Question in the database
                Question.create(question)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Question."
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

// Retrieve all Questions from the database.
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

    Question.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Questions."
            });
        });
};

// Find a single Question with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Question.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Question with id=" + id
            });
        });
};

// Update a Question by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    Question.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Question was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Question with id=" + id
            });
        });
};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Question.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Question was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Question with id=" + id
            });
        });
};

// Delete all Questions from the database.
exports.deleteAll = (req, res) => {
    Question.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Questions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all questions."
            });
        });
};

// Retrieve Questions latest from the database.
exports.findLatest = (req, res) => {

    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status
    };

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Question.findAndCountAll({
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
                message: err.message || "Some error occurred while retrieving Questions."
            });
        });


};

// Retrieve Questions by category from the database.
exports.findByCategoryId = (req, res) => {
    var id = req.params.id;

    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status,
        question_category_id: id,
    };

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Question.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Questions."
            });
        });


};

// find one Question by Slug
exports.findOneBySlug = (req, res) => {
    var slug = req.params.slug;
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status,
        slug: slug
    };
    Question.findOne({
        where: condition
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.send(`Không tồn tại câu hỏi với slug = ${slug} hoặc câu hỏi đã bị vô hiệu hóa!`)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Question Category with slug=" + slug
        });
    });
};