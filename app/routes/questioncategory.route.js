module.exports = app => {
    const questionCategories = require("../controllers/questioncategory.controller.js");

    var router = require("express").Router();

    // Create a new QuestionCategory
    router.post("/", questionCategories.create);

    // Retrieve all QuestionCategories
    router.get("/", questionCategories.findAll);


    // Retrieve a single QuestionCategory by slug
    router.get("/slug/:slug", questionCategories.findOneBySlug);
    

    // Retrieve a single QuestionCategory with id
    router.get("/:id", questionCategories.findOne);

    // Update a QuestionCategory with id
    router.put("/:id", questionCategories.update);

    // Delete a QuestionCategory with id
    router.delete("/:id", questionCategories.delete);

    // Delete all QuestionCategories
    router.delete("/", questionCategories.deleteAll);

    app.use('/api/question-categories', router);
};