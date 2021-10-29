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



require('./app/routes/admin.route')(app);
require('./app/routes/admincontact.route')(app);
require('./app/routes/adminnotification.route')(app);
require('./app/routes/blog.route')(app);
require('./app/routes/blogcategory.route')(app);
require('./app/routes/customer.route')(app);
require('./app/routes/customernotification.route')(app);
require('./app/routes/customerpremium.route')(app);
require('./app/routes/premium.route')(app);
require('./app/routes/premiumbill.route')(app);
require('./app/routes/promotion.route')(app);
require('./app/routes/rental.route')(app);
require('./app/routes/rentalbill.route')(app);
require('./app/routes/rentalnews.route')(app);


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