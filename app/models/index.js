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


// AdminContacts
db.Admins.hasMany(db.AdminContacts, {
  foreignKey: "adminId",
});
db.AdminContacts.belongsTo(db.Admins, {
  foreignKey: "adminId",
});


// AdminNotifications
db.Admins.hasMany(db.AdminNotifications, {
  foreignKey: "adminId",
});
db.AdminNotifications.belongsTo(db.Admins, {
  foreignKey: "adminId",
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


// Blogs
db.BlogCategories.hasMany(db.Blogs, {
  foreignKey: "blogCategoryId",
});
db.Blogs.belongsTo(db.BlogCategories, {
  foreignKey: "blogCategoryId",
});
db.Admins.hasMany(db.Blogs, {
  foreignKey: "adminId",
});
db.Blogs.belongsTo(db.Admins, {
  foreignKey: "adminId",
});

// Bookmarks
db.Customers.hasOne(db.Bookmarks, {
  foreignKey: "customerId",
});
db.Bookmarks.belongsTo(db.Customers, {
  foreignKey: "customerId",
});

// Comments
db.Customers.hasMany(db.Comments, {
  foreignKey: "customerId",
});
db.Comments.belongsTo(db.Customers, {
  foreignKey: "customerId",
});
db.Blogs.hasMany(db.Comments, {
  foreignKey: "blogId",
});
db.Comments.belongsTo(db.Blogs, {
  foreignKey: "blogId",
});

// CustomerContacts
db.RentalNews.hasMany(db.CustomerContacts, {
  foreignKey: "rentalNewsId",
});
db.CustomerContacts.belongsTo(db.RentalNews, {
  foreignKey: "rentalNewsId",
});
db.Customers.hasMany(db.CustomerContacts, {
  foreignKey: "customerId",
});
db.CustomerContacts.belongsTo(db.Customers, {
  foreignKey: "customerId",
});

// CustomerNotifications
db.Customers.hasMany(db.CustomerNotifications, {
  foreignKey: "customerId",
});
db.CustomerNotifications.belongsTo(db.Customers, {
  foreignKey: "customerId",
});


// CustomerPremiumServices
db.PremiumServices.hasMany(db.CustomerPremiumServices, {
  foreignKey: "premiumId",
});
db.CustomerPremiumServices.belongsTo(db.PremiumServices, {
  foreignKey: "premiumId",
});
db.Customers.hasMany(db.CustomerPremiumServices, {
  foreignKey: "customerId",
});
db.CustomerPremiumServices.belongsTo(db.Customers, {
  foreignKey: "customerId",
});

// PremiumBills
db.Customers.hasMany(db.PremiumBills, {
  foreignKey: "customerId",
});
db.PremiumBills.belongsTo(db.Customers, {
  foreignKey: "customerId",
});
db.PremiumServices.hasMany(db.PremiumBills, {
  foreignKey: "premiumId",
});
db.PremiumBills.belongsTo(db.PremiumServices, {
  foreignKey: "premiumId",
});

// PremiumServices
db.Promotions.hasMany(db.PremiumServices, {
  foreignKey: "promotionId",
});
db.PremiumServices.belongsTo(db.Promotions, {
  foreignKey: "promotionId",
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

// Rentals
db.Customers.hasMany(db.Rentals, {
  foreignKey: "customerId",
});
db.Rentals.belongsTo(db.Customers, {
  foreignKey: "customerId",
});

// RentalBills
db.Rentals.hasMany(db.RentalBills, {
  foreignKey: "rentalId",
});
db.RentalBills.belongsTo(db.Rentals, {
  foreignKey: "rentalId",
});
db.RentalRooms.hasMany(db.RentalBills, {
  foreignKey: "rentalRoomId",
});
db.RentalBills.belongsTo(db.RentalRooms, {
  foreignKey: "rentalRoomId",
});
db.Customers.hasMany(db.RentalBills, {
  foreignKey: "customerId",
});
db.RentalBills.belongsTo(db.Customers, {
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

// RentalRooms
db.Rentals.hasMany(db.RentalRooms, {
  foreignKey: "rentalId",
});
db.RentalRooms.belongsTo(db.Rentals, {
  foreignKey: "rentalId",
});

// Renters
db.Rentals.hasMany(db.Renters, {
  foreignKey: "rentalId",
});
db.Renters.belongsTo(db.Rentals, {
  foreignKey: "rentalId",
});
db.RentalRooms.hasMany(db.Renters, {
  foreignKey: "rentalRoomId",
});
db.Renters.belongsTo(db.RentalRooms, {
  foreignKey: "rentalRoomId",
});









module.exports = db;