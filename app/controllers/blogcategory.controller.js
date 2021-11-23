const db = require("../models");
const BlogCategory = db.BlogCategories;
const Op = db.Sequelize.Op;

// Create and Save a new BlogCategory
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a BlogCategory
    const blogCategory = {
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
};

// Retrieve all BlogCategorys from the database.
exports.findAll = (req, res) => {
    // const username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition = null;

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
    let id = req.params.id;

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
    let id = req.params.id;

    BlogCategory.update(req.body, {
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
};

// Delete a BlogCategory with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

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

// Delete all BlogCategorys from the database.
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
    let slug = req.params.slug;
    // res.send('hehehe')
    BlogCategory.findOne({
            where: {
                slug: slug
            }
        }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Blog Category with slug=" + slug
            });
        });
};