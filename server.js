const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors());

// parse requests of content-type - application/json
// app.use(bodyParser.json());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();


require('./app/routes/customer.route')(app);

require('./app/routes/admin.route')(app);
require('./app/routes/admincontact.route')(app);


// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Fukuro server" + process.env.PORT
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});