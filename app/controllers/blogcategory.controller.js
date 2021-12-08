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
                            message: err.message || "Some error occurred while creating the Blog Category."
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

// Retrieve all BlogCategory from the database.
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

    BlogCategory.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Blog Categories."
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
                message: "Error retrieving Blog Category with id=" + id
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
                    message: "Error retrieving Question with slug=" + slug
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
                        message: "Blog Category was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Blog Category with id=${id}. Maybe Blog Category was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Blog Category with id=" + id
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
                    message: "Blog Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Blog Category with id=${id}. Maybe Blog Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Blog Category with id=" + id
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
                message: `${nums} Blog Categories were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all blog categories."
            });
        });
};

// find one BlogCategory by Slug
exports.findOneBySlug = (req, res) => {
    var slug = req.params.slug;
    var status = +req.query.status;
    status = (status == 'both') ? null : 1;
    var condition = {
        status: status,
        slug: slug
    };
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
                message: "Error retrieving Blog Category with slug=" + slug
            });
        });
};