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
                            message: "Đã xảy ra một số lỗi khi tạo Question Category!",
                            error: err.message
                        });
                    });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Question with slug=" + slug,
                error: err.message
            });
        });



};

// Retrieve all QuestionCategory from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
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

    QuestionCategory.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Question Categories!",
                error: err.message
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
                message: "Lỗi khi truy xuất Question Category with id=" + id,
                error: err.message
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
                    message: "Lỗi khi truy xuất Question with slug=" + slug,
                    error: err.message
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
                        message: "Question Category được cập nhật thành công!"
                    });
                } else {
                    res.send({
                        message: `Không thể cập nhật thông tin Question Category with id=${id}. Maybe Question Category was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Lỗi khi cập nhật Question Category with id=" + id,
                    error: err.message
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
                    message: "Question Category đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Question Category with id=${id}. Maybe Question Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Question Category with id=" + id,
                error: err.message
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
                message: `${nums} Question Categories đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả question categories!",
                error: err.message
            });
        });
};

// find one QuestionCategory by Slug
exports.findOneBySlug = (req, res) => {
    var slug = req.params.slug;
    var status = req.query.status;
    var condition = {
        slug: slug
    };
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }
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
                message: "Lỗi khi truy xuất Question Category with slug=" + slug,
                error: err.message
            });
        });
};