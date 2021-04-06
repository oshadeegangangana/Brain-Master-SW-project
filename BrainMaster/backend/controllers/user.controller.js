const Validator = require("fastest-validator");
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const user = {
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        age: req.body.age,
        password: req.body.password,
        role: req.body.role,
        total_marks: req.body.total_marks,
    };

    const schema = {
        email: {type: "string", optional: false},
        password: {type: "string", optional: false},
    };

    const v = new Validator();
    const validateResponse = v.validate(user, schema);

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse,
        });
    }

    models.User.create(user)
        .then((result) => {
            res.status(201).json({
                message: "User created successfully",
                user: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Email already used",
                error: error,
            });
        });
}

function show(req, res) {
    const id = req.params.id;

    models.User.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "User not found",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function index(req, res) {
    models.User.findAll()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function ranking(req, res) {
    models.User.findAll({
        where: {role: "user"},
        order: [
            ['total_marks', 'DESC'],
        ],
        limit: 10,
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function update(req, res) {
    const id = req.params.id;
    const updatedUser = {
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        age: req.body.age,
        password: req.body.password,
        role: req.body.role,
        total_marks: req.body.total_marks,
    };


    models.User.update(updatedUser, {where: {user_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "User updated successfully",
                    user: updatedUser,
                });
            } else {
                res.status(404).json({
                    message: "User not found",
                });
            }

        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function destroy(req, res) {
    const id = req.params.id;

    models.User.destroy({where: {user_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "User deleted successfully",
                });
            } else {
                res.status(200).json({
                    message: "User not found",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
    ranking: ranking,
};
