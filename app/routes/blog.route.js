module.exports = app => {
    const blogs = require("../controllers/blog.controller.js");

    var router = require("express").Router();

    // Create a new Blog
    router.post("/", blogs.create);

    // Retrieve all Blogs
    router.get("/", blogs.findAll);
    
    // Retrieve all Blogs latest
    router.get("/latest", blogs.findLatest);

    // Retrieve all Blogs by category
    router.get("/category/:id", blogs.findByCategory);


    // Retrieve a single Blog by slug
    router.get("/slug/:slug", blogs.findOneBySlug);

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