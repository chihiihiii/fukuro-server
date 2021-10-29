module.exports = app => {
    const blogs = require("../controllers/blog.controller.js");

    var router = require("express").Router();

    // Create a new Blog
    router.post("/", blogs.create);

    // Retrieve all Blogs
    router.get("/", blogs.findAll);


    // Retrieve a single Blog with id
    router.get("/:id", blogs.findOne);

    // Update a Blog with id
    router.put("/:id", blogs.update);

    // Delete a Blog with id
    router.delete("/:id", blogs.delete);

    // Delete all Blogs
    router.delete("/", blogs.deleteAll);

    app.use('/api/blogs', router);
};