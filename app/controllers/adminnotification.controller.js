const db = require("../models");
const AdminNotification = db.AdminNotifications;
const Op = db.Sequelize.Op;

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.message || !req.body.detail_url) {
        res.status(400).send({
            message: "Không được để trống nội dung thông báo hoặc chi tiết url!"
        });
        return;
    }

    // Create a Admin
    var adminNotification = {
        message: req.body.message,
        detailUrl: req.body.detail_url,
        status: req.body.status
    };

    // Save Admin in the database
    AdminNotification.create(adminNotification)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Admin Notification!"
            });
        });
};

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
    // var username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition = null;

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    AdminNotification.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Admin Notification!",
                error: err.message
            });
        });
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    AdminNotification.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Admin Notification with id=" + id,
                error: err.message
            });
        });
};

// Update a Admin by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    AdminNotification.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin Notification được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Admin Notification with id=${id}. Maybe Admin Notification was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Admin Notification with id=" + id,
                error: err.message
            });
        });
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    AdminNotification.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin Notification đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Admin Notification with id=${id}. Maybe Admin Notification was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Admin Notification with id=" + id,
                error: err.message
            });
        });
};

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
    AdminNotification.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Admin Notification đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả admin notifications!",
                error: err.message
            });
        });
};
