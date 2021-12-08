module.exports = app => {
    const bookmarks = require("../controllers/bookmark.controller.js");

    var router = require("express").Router();

    // Create a new Bookmark
    // router.post("/", bookmarks.create);

    // Retrieve all Bookmarks
    router.get("/", bookmarks.findAll);


    // Retrieve all Bookmark with customer id
    router.get("/customer/:id", bookmarks.findAllByCustomerId);

    // Update a Bookmark with customer id
    router.post("/customer/:id", bookmarks.updateByCustomerId);

    // Delete a Bookmark with customer id
    router.delete("/customer/:id", bookmarks.deleteAllByCustomerId);



    // Retrieve a single Bookmark with id
    router.get("/:id", bookmarks.findOne);

    // Update a Bookmark with id
    // router.put("/:id", bookmarks.update);

    // Delete a Bookmark with id
    router.delete("/:id", bookmarks.delete);



    // Delete all Bookmarks
    router.delete("/", bookmarks.deleteAll);


    app.use('/api/bookmarks', router);
};