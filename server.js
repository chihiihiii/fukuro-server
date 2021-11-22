const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');

const app = express();


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();
// db.sequelize.sync({ alter: true, force: false });

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

require('./app/routes/admin.route')(app);
require('./app/routes/admincontact.route')(app);
require('./app/routes/adminnotification.route')(app);
require('./app/routes/blog.route')(app);
require('./app/routes/blogcategory.route')(app);
require('./app/routes/customer.route')(app);
require('./app/routes/customercontact.route')(app);
require('./app/routes/customernotification.route')(app);
require('./app/routes/customerpremiumservice.route')(app);
require('./app/routes/premiumservice.route')(app);
require('./app/routes/premiumbill.route')(app);
require('./app/routes/promotion.route')(app);
require('./app/routes/rental.route')(app);
require('./app/routes/rentalbill.route')(app);
require('./app/routes/rentalnews.route')(app);
require('./app/routes/comment.route')(app);
require('./app/routes/passwordreset.route')(app);


// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Fukuro server" + process.env.PORT
    });
});

app.post('/file', upload.single('file'), (req, res, next) => {
    // const file = req.file;
    // console.log(file.filename);
    // if (!file) {
    //     const error = new Error('No File')
    //     error.httpStatusCode = 400
    //     return next(error)
    // }
    // res.send(file);
    res.json({
        message: req
    });
})

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});