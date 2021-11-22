module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Create a new Comment
    router.post("/", comments.create);

    // Retrieve all Comments
    router.get("/", comments.findAll);

    // Retrieve all Comments by Blog
    router.get("/blog/:id", comments.findByBlog);


    // Retrieve a single Comment with id
    router.get("/:id", comments.findOne);

    // Update a Comment with id
    router.put("/:id", comments.update);

    // Delete a Comment with id
    router.delete("/:id", comments.delete);

    // Delete all Comments
    router.delete("/", comments.deleteAll);

    app.use('/api/comments', router);
};