module.exports = app => {
    const todo = require("../controllers/todo.controller.js");

    var router = require("express").Router();

    // Create a new Task
    router.post("/create", todo.create);

    // Retrieve all the Tasks
    router.post("/findall", todo.findAll);

    // find all tasks for a particular subject
    router.post("/sub", todo.findBySubject);

    // update for a particular id
    router.put("/:id", todo.update);

    // Delete a Task with id
    router.delete("/:id", todo.delete);

    // Retrieve all the tasks before a deadline
    router.post("/before", todo.findBeforeDate);

    app.use('/api/todo', router);
};