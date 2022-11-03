const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./models");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        server: {
            socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
        },
        replset: {
            socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 },
        }
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

const app = express();


var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my Todo list rest API wohooo." });
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;

require("./routes/todo.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});