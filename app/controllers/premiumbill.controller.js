const db = require("../models");
const PremiumBill = db.PremiumBills;
const CustomerPremiumService = db.CustomerPremiumServices;

const Op = db.Sequelize.Op;

// Create and Save a new PremiumBill
exports.create = (req, res) => {
    // Validate request
    if (!req.body.customer_id || !req.body.premium_id || !req.body.expire) {
        res.status(400).send({
            message: "Không để trống mã khách hàng hoặc mã dịch vụ premium hoặc thời hạn!"
        });
        return;
    }

    var name = req.body.name;
    var price = req.body.price;
    var expire = req.body.expire;
    var totalPrice = req.body.total_price;
    var paymentStatus = req.body.payment_status;
    var status = req.body.status;
    var customerId = req.body.customer_id;
    var premiumId = req.body.premium_id;

    // Create a PremiumBill
    var premiumBill = {
        name: name,
        price: price,
        expire: expire,
        totalPrice: totalPrice,
        paymentStatus: paymentStatus,
        status: status,
        customerId: customerId,
        premiumId: premiumId,
    };

    // Save PremiumBill in the database
    PremiumBill.create(premiumBill)
        .then(data => {
            // res.send(data);

            createCustomerPremiumService(customerId, premiumId, expire);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Premium Bill!",
                error: err.message
            });
        });



    function createCustomerPremiumService(customerId, premiumId, expire) {

        CustomerPremiumService.findOne({
                where: {
                    customerId: customerId,
                    premiumId: premiumId,
                }
            })
            .then(data => {
                // res.send(data);
                var currentTime = new Date();

                if (data) {
                    var customerPremiumServiceId = data.dataValues.id

                    var currentTime = new Date();
                    var startDateDB = data.dataValues.startDate
                    var endDateDB = data.dataValues.endDate

                    if (currentTime > endDateDB) {


                        var currentDate = currentTime.getDate();
                        var currentMonth = currentTime.getMonth();
                        var currentYear = currentTime.getFullYear();
                        var currentHours = currentTime.getHours();
                        var currentMinutes = currentTime.getMinutes();

                        var endMonth = parseInt(currentMonth) + parseInt(expire);
                        if (endMonth > 11) {

                            endYear = parseInt(currentYear) + 1;
                            endMonth = endMonth - 11

                        } else {
                            endYear = currentYear;
                        }

                        var endDate = new Date(endYear, endMonth, currentDate, currentHours, currentMinutes)
                        var startDate = currentTime;
                        console.log('lon');
                        console.log(currentYear);
                        console.log(endYear);


                    } else {


                        console.log('nho hon');
                        console.log(currentTime);
                        console.log(endDateDB);
                        var endDate = endDateDB.getDate();
                        var endMonth = endDateDB.getMonth();
                        var endYear = endDateDB.getFullYear();
                        var endHours = endDateDB.getHours();
                        var endMinutes = endDateDB.getMinutes();
                        console.log(endMonth);
                        console.log(expire);

                        var endMonth = parseInt(endMonth) + parseInt(expire);

                        console.log(endDate);
                        console.log(endMonth);
                        console.log(endYear);
                        console.log(endHours);
                        console.log(endMinutes);
                        if (endMonth > 11) {
                            endYear = parseInt(endYear) + 1;
                            endMonth = endMonth - 11
                        }

                        endDate = new Date(endYear, endMonth, endDate, endHours, endMinutes);
                        var startDate = startDateDB;



                    }
                    console.log(startDate);
                    console.log(endDate);

                    // Update a CustomerPremiumService
                    var customerPremiumService = {
                        startDate: startDate,
                        endDate: endDate,
                        status: 1,

                    };

                    CustomerPremiumService.update(customerPremiumService, {
                            where: {
                                id: customerPremiumServiceId
                            }
                        })
                        .then(num => {
                            if (num == 1) {
                                res.status(200).send({
                                    message: "Customer Premium Service được cập nhật thành công!"
                                });
                            } else {
                                res.status(400).send({
                                    message: `Không thể cập nhật thông tin Customer Premium Service with id=${customerPremiumServiceId}. Maybe Customer Premium was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Lỗi khi cập nhật Customer Premium with id=" + customerPremiumServiceId,
                                error: err.message
                            });
                        });

                } else {
                    var currentTime = new Date();

                    var currentDate = currentTime.getDate();
                    var currentMonth = currentTime.getMonth();
                    var currentYear = currentTime.getFullYear();
                    var currentHours = currentTime.getHours();
                    var currentMinutes = currentTime.getMinutes();

                    var endMonth = currentMonth + expire;
                    if (endMonth > 11) {

                        endYear = currentYear + 1;
                        endMonth = endMonth - 11

                    } else {
                        endYear = currentYear;
                    }

                    var endDate = new Date(endYear, endMonth, currentDate, currentHours, currentMinutes)
                    var startDate = currentTime;

                    // Create a CustomerPremiumService
                    var customerPremiumService = {
                        startDate: startDate,
                        endDate: endDate,
                        customerId: customerId,
                        premiumId: premiumId,

                    };

                    // Save CustomerPremiumService in the database
                    CustomerPremiumService.create(customerPremiumService)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Đã xảy ra một số lỗi khi tạo Customer Premium!",
                                error: err.message
                            });
                        });


                }

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Admin!",
                    error: err.message
                });
            });
    }
};


// Retrieve all PremiumBills from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;

    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    PremiumBill.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất premium bills!",
                error: err.message
            });
        });
};

// Find a single PremiumBill with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    PremiumBill.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Premium Bill with id=" + id,
                error: err.message
            });
        });
};

// Update a PremiumBill by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    // Update a PremiumBill
    var premiumBill = {
        name: req.body.name,
        price: req.body.price,
        expire: req.body.expire,
        totalPrice: req.body.total_price,
        paymentStatus: req.body.payment_status,
        status: req.body.status,
        customerId: req.body.customer_id,
        premiumId: req.body.premium_id,
    };

    PremiumBill.update(premiumBill, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Premium Bill được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Premium Bill with id=${id}. Maybe Premium Bill was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Premium Bill with id=" + id,
                error: err.message
            });
        });
};

// Delete a PremiumBill with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    PremiumBill.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Premium Bill đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Premium Bill with id=${id}. Maybe Premium Bill was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Premium Bill with id=" + id,
                error: err.message
            });
        });
};

// Delete all PremiumBills from the database.
exports.deleteAll = (req, res) => {
    PremiumBill.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Premium Bills đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả premium bills!",
                error: err.message
            });
        });
};