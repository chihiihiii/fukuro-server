const db = require("../models");
const Blog = db.Blogs;
const BlogCategory = db.BlogCategories;
const Op = db.Sequelize.Op;

// Create and Save a new Blog
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.slug) {
        res.status(400).send({
            message: "Không để trống tựa bài viết!"
        });
        return;
    }

    Blog.findOne({
            where: {
                slug: req.body.slug
            }
        }).then(data => {
            if (data) {
                res.status(400).send({
                    message: "Slug đã tồn tại. Vui lòng chọn tên khác!"
                });
            } else {
                // Create a Blog
                var blog = {
                    title: req.body.title,
                    slug: req.body.slug,
                    thumbnail: req.body.thumbnail,
                    summary: req.body.summary,
                    description: req.body.description,
                    tag: req.body.tag,
                    status: req.body.status,
                    blogCategoryId: req.body.blog_category_id,
                    adminId: req.body.admin_id
                };
                // console.log(blog);

                // Save Blog in the database
                Blog.create(blog)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Đã xảy ra một số lỗi khi tạo Blog!",
                            error: err.message
                        });
                    });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Blog with slug=" + slug,
                error: err.message
            });
        });



};

// Retrieve all Blogs from the database.
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

    Blog.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit,
            include: [{
                    model: BlogCategory,
                    where: {
                        status: 1
                    },
                },

            ],
            raw: true,
            nest: true
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Blogs!",
                error: err.message
            });
        });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Blog.findOne({
            where: {
                id: id
            },
            include: [{
                    model: BlogCategory,
                    where: {
                        status: 1
                    },
                },

            ],
            raw: true,
            nest: true
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Blog with id=" + id,
                error: err.message
            });
        });
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    if (req.body.slug) {
        Blog.findOne({
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
                    message: "Lỗi khi truy xuất Blog with slug=" + slug,
                    error: err.message
                });
            });

    } else {
        update();
    }


    function update() {

        // update blog
        var blog = {
            title: req.body.title,
            slug: req.body.slug,
            thumbnail: req.body.thumbnail,
            summary: req.body.summary,
            description: req.body.description,
            tag: req.body.tag,
            status: req.body.status,
            blogCategoryId: req.body.blog_category_id,
            adminId: req.body.admin_id
        };

        Blog.update(blog, {
                where: {
                    id: id
                }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Blog được cập nhật thành công!"
                    });
                } else {
                    res.send({
                        message: `Không thể cập nhật thông tin Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Lỗi khi cập nhật Blog with id=" + id,
                    error: err.message
                });
            });

    }



};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Blog.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Blog đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Blog with id=${id}. Maybe Blog was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Blog with id=" + id,
                error: err.message
            });
        });
};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {
    Blog.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Blogs đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả blogs!",
                error: err.message
            });
        });
};


// Retrieve Blogs by category from the database.
exports.findByCategoryId = (req, res) => {
    var id = req.params.id;

    var status = req.query.status;
    var condition = {
        blog_category_id: id,
    };
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }


    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Blog.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Blogs!",
                error: err.message
            });
        });


};

// find one Blog by Slug
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


    Blog.findOne({
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
                message: "Lỗi khi truy xuất Blog with slug=" + slug,
                error: err.message
            });
        });
};