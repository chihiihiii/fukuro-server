module.exports = app => {
    const questions = require("../controllers/question.controller.js");

    var router = require("express").Router();

    // Create a new Question
    router.post("/", questions.create);

    // Retrieve all Questions
    router.get("/", questions.findAll);
    
    // Retrieve all Questions latest
    router.get("/latest", questions.findLatest);

    // Retrieve all Questions by category
    router.get("/category/:id", questions.findByCategoryId);


    // Retrieve a single Question by slug
    router.get("/slug/:slug", questions.findOneBySlug);

    // Retrieve a single Question with id
    router.get("/:id", questions.findOne);

    // Update a Question with id
    router.put("/:id", questions.update);

    // Delete a Question with id
    router.delete("/:id", questions.delete);

    // Delete all Questions
    router.delete("/", questions.deleteAll);

    app.use('/api/questions', router);
};