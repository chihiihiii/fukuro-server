'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Admins= require("./admin.js")(sequelize, Sequelize);
db.AdminContacts= require("./admincontact.js")(sequelize, Sequelize);
db.AdminNotifications= require("./adminnotification.js")(sequelize, Sequelize);
db.Blogs= require("./blog.js")(sequelize, Sequelize);
db.BlogCategories= require("./blogcategory.js")(sequelize, Sequelize);
db.Customers= require("./customer.js")(sequelize, Sequelize);
db.CustomerContacts= require("./customercontact.js")(sequelize, Sequelize);
db.CustomerNotifications= require("./customernotification.js")(sequelize, Sequelize);
db.CustomerPremiumServices= require("./customerpremiumservice.js")(sequelize, Sequelize);
db.PremiumServices= require("./premiumservice.js")(sequelize, Sequelize);
db.PremiumBills= require("./premiumbill.js")(sequelize, Sequelize);
db.Promotions= require("./promotion.js")(sequelize, Sequelize);
db.Rentals= require("./rental.js")(sequelize, Sequelize);
db.RentalBills= require("./rentalbill.js")(sequelize, Sequelize);
db.RentalNews= require("./rentalnews.js")(sequelize, Sequelize);
db.Comments= require("./comment.js")(sequelize, Sequelize);
db.PasswordResets= require("./passwordreset.js")(sequelize, Sequelize);


module.exports = db;
