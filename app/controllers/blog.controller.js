const db = require("../models");
const Blog = db.Blogs;
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
                            message: err.message || "Some error occurred while creating the Blog."
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

// Retrieve all Blogs from the database.
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
                message: err.message || "Some error occurred while retrieving Blogs."
            });
        });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Blog.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Blog with id=" + id
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
                    message: "Error retrieving Question with slug=" + slug
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
                        message: "Blog was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Blog with id=" + id
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
                    message: "Blog was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Blog with id=" + id
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
                message: `${nums} Blogs were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all blogs."
            });
        });
};

// Retrieve Blogs latest from the database.
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

    Blog.findAndCountAll({
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
                message: err.message || "Some error occurred while retrieving Blogs."
            });
        });


};

// Retrieve Blogs by category from the database.
exports.findByCategoryId = (req, res) => {
    var id = req.params.id;

    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status,
        blog_category_id: id,
    };

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
                message: err.message || "Some error occurred while retrieving Blogs."
            });
        });


};

// find one Blog by Slug
exports.findOneBySlug = (req, res) => {
    var slug = req.params.slug;
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status,
        slug: slug
    };
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
                message: "Error retrieving Blog with slug=" + slug
            });
        });
};