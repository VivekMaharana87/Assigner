

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            task: String,
            subject: String,
            posted: Date,
            due: Date,
            comments: String,
            marks: Number,
            teacher: String,
            code: Number

        }
    );

    // schema.method("toJSON", function () {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    const todo = mongoose.model("todo", schema);
    return todo;
};