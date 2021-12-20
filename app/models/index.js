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

db.Admins = require("./admin.js")(sequelize, Sequelize);
db.AdminContacts = require("./admincontact.js")(sequelize, Sequelize);
db.AdminNotifications = require("./adminnotification.js")(sequelize, Sequelize);
db.Blogs = require("./blog.js")(sequelize, Sequelize);
db.BlogCategories = require("./blogcategory.js")(sequelize, Sequelize);
db.Customers = require("./customer.js")(sequelize, Sequelize);
db.CustomerContacts = require("./customercontact.js")(sequelize, Sequelize);
db.CustomerNotifications = require("./customernotification.js")(sequelize, Sequelize);
db.CustomerPremiumServices = require("./customerpremiumservice.js")(sequelize, Sequelize);
db.PremiumServices = require("./premiumservice.js")(sequelize, Sequelize);
db.PremiumBills = require("./premiumbill.js")(sequelize, Sequelize);
db.Promotions = require("./promotion.js")(sequelize, Sequelize);
db.Rentals = require("./rental.js")(sequelize, Sequelize);
db.RentalBills = require("./rentalbill.js")(sequelize, Sequelize);
db.RentalNews = require("./rentalnews.js")(sequelize, Sequelize);
db.Comments = require("./comment.js")(sequelize, Sequelize);
db.PasswordResets = require("./passwordreset.js")(sequelize, Sequelize);
db.Bookmarks = require("./bookmark.js")(sequelize, Sequelize);
db.QuestionCategories = require("./questioncategory.js")(sequelize, Sequelize);
db.Questions = require("./question.js")(sequelize, Sequelize);
db.Answers = require("./answer.js")(sequelize, Sequelize);
db.RentalRooms = require("./rentalroom.js")(sequelize, Sequelize);
db.Renters = require("./renter.js")(sequelize, Sequelize);


// PremiumService
db.PremiumServices.hasMany(db.CustomerPremiumServices, {
  foreignKey: "premiumId",
  // as: "customerPremiumService"
});
db.CustomerPremiumServices.belongsTo(db.PremiumServices, {
  foreignKey: "premiumId",
  // as: "premiumService",
});

// Answers
db.Questions.hasMany(db.Answers, {
  foreignKey: "questionId",
});
db.Answers.belongsTo(db.Questions, {
  foreignKey: "questionId",
});
db.Customers.hasMany(db.Answers, {
  foreignKey: "customerId",
});
db.Answers.belongsTo(db.Customers, {
  foreignKey: "customerId",
});

// Questions
db.QuestionCategories.hasMany(db.Questions, {
  foreignKey: "questionCategoryId",
});
db.Questions.belongsTo(db.QuestionCategories, {
  foreignKey: "questionCategoryId",
});
db.Customers.hasMany(db.Questions, {
  foreignKey: "customerId",
});
db.Questions.belongsTo(db.Customers, {
  foreignKey: "customerId",
});

// RentalNews
db.Customers.hasMany(db.RentalNews, {
  foreignKey: "customerId",
});
db.RentalNews.belongsTo(db.Customers, {
  foreignKey: "customerId",
});
db.Promotions.hasMany(db.RentalNews, {
  foreignKey: "promotionId",
});
db.RentalNews.belongsTo(db.Promotions, {
  foreignKey: "promotionId",
});








module.exports = db;