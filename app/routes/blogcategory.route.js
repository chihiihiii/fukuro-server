module.exports = app => {
    const blogCategories = require("../controllers/blogcategory.controller.js");

    var router = require("express").Router();

    // Create a new BlogCategory
    router.post("/", blogCategories.create);

    // Retrieve all BlogCategories
    router.get("/", blogCategories.findAll);


    // Retrieve a single BlogCategory by slug
    router.get("/slug/:slug", blogCategories.findOneBySlug);
    

    // Retrieve a single BlogCategory with id
    router.get("/:id", blogCategories.findOne);

    // Update a BlogCategory with id
    router.put("/:id", blogCategories.update);

    // Delete a BlogCategory with id
    router.delete("/:id", blogCategories.delete);

    // Delete all BlogCategories
    router.delete("/", blogCategories.deleteAll);

    app.use('/api/blog-categories', router);
};