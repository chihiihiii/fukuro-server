const db = require("../models");
const BlogCategory = db.BlogCategories;
const Op = db.Sequelize.Op;

// Create and Save a new BlogCategory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.slug) {
        res.status(400).send({
            message: "Không để trống tên loại bài viết!"
        });
        return;
    }

    BlogCategory.findOne({
            where: {
                slug: req.body.slug
            }
        }).then(data => {
            if (data) {
                res.status(400).send({
                    message: "Slug đã tồn tại. Vui lòng chọn tên khác!"
                });
            } else {
                // Create a BlogCategory
                var blogCategory = {
                    name: req.body.name,
                    slug: req.body.slug,
                    status: req.body.status,

                };

                // Save BlogCategory in the database
                BlogCategory.create(blogCategory)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Đã xảy ra một số lỗi khi tạo Blog Category!"
                        });
                    });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Blog Category with slug=" + slug
            });
        });



};

// Retrieve all BlogCategory from the database.
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

    BlogCategory.findAndCountAll({
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
                message: "Đã xảy ra một số lỗi khi truy xuất Blog Categories!",
                error: err.message
            });
        });
};

// Find a single BlogCategory with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    BlogCategory.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Blog Category with id=" + id,
                error: err.message
            });
        });
};

// Update a BlogCategory by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    if (req.body.slug) {
        BlogCategory.findOne({
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
                    message: "Lỗi khi truy xuất Blog Category with slug=" + slug,
                    error: err.message
                });
            });

    } else {
        update();
    }


    function update() {

        // Update a BlogCategory
        var blogCategory = {
            name: req.body.name,
            slug: req.body.slug,
            status: req.body.status,

        };

        BlogCategory.update(blogCategory, {
                where: {
                    id: id
                }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Blog Category được cập nhật thành công!"
                    });
                } else {
                    res.send({
                        message: `Không thể cập nhật thông tin Blog Category with id=${id}. Maybe Blog Category was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Lỗi khi cập nhật Blog Category with id=" + id,
                    error: err.message
                });
            });


    }




};

// Delete a BlogCategory with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    BlogCategory.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Blog Category đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Blog Category with id=${id}. Maybe Blog Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Blog Category with id=" + id,
                error: err.message
            });
        });
};

// Delete all BlogCategory from the database.
exports.deleteAll = (req, res) => {
    BlogCategory.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Blog Categories đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả blog categories!",
                error: err.message
            });
        });
};

// find one BlogCategory by Slug
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


    BlogCategory.findOne({
            where: condition
        }).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.send(`Không tồn tại bài viết với slug = ${slug} hoặc bài viết đã bị vô hiệu hóa!`)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Blog Category with slug=" + slug,
                error: err.message
            });
        });
};