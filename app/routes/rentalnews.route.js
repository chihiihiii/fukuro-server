module.exports = app => {
    const rentalNews = require("../controllers/rentalnews.controller.js");

    var router = require("express").Router();

    // Create a new RentalNews
    router.post("/", rentalNews.create);

    // Retrieve all RentalNews
    router.get("/", rentalNews.findAll);

    // Search RentalNews  
    router.post("/search", rentalNews.search);

    // Retrieve RentalNews latest 
    router.get("/latest", rentalNews.findLatest);

    // Retrieve RentalNews priority 
    router.get("/priority", rentalNews.findPriority);

    // Retrieve RentalNews by customer 
    router.get("/customer/:id", rentalNews.findByCustomerId);


    // Retrieve a single RentalNews by slug
    router.get("/slug/:slug", rentalNews.findOneBySlug);


    // Retrieve a single RentalNews with id
    router.get("/:id", rentalNews.findOne);

    // Update a RentalNews with id
    router.put("/:id", rentalNews.update);

    // Delete a RentalNews with id
    router.delete("/:id", rentalNews.delete);

    // Delete all RentalNews
    router.delete("/", rentalNews.deleteAll);






    app.use('/api/rental-news', router);
};