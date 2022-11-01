const db = require("../models");
const todo = db.todo;


// const todoSchema = new Schema({
//     {
//     task: String,
//     subject: String,
//     posted: Date,
//     due: Date,
//     comments: String,
//     marks: Number,
//     teacher: String,
//     code: Number

// }
// })

// Create and Save a new Task
exports.create = (req, res) => {

    // Validate request
    if (!req.body.task) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const newtask = new todo({
        task: req.body.task,
        subject: req.body.subject,
        // current date can be passed through frontend or initialised here
        posted: new Date(),  //initialise with the current date
        due: req.body.due,
        comments: req.body.comments,
        marks: req.body.marks,
        teacher: req.body.teacher,
        code: req.body.code


    });

    // Save Tutorial in the database
    newtask
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });

};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {

    const code = req.body.code;

    todo.find({ code: code })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });
};

// Find tasks with a particular subject
exports.findBySubject = (req, res) => {

    const sub = req.body.subject;
    const code = req.body.code;

    todo.find({ subject: sub, code: code })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });

};

// Update a Task by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found!`
                });
            } else res.send({ message: "Task was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });

};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    todo.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            } else {
                res.send({
                    message: "Task was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Find all the tasks before certain date
exports.findBeforeDate = (req, res) => {

    const date = req.body.date;
    const code = req.body.code;

    // {$and: [{  }]}

    todo.find({ due: { $lte: date }, code: code })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });

};



