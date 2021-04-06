const Validator = require("fastest-validator");
const models = require("../models");

function index(req, res) {
    models.User.findOne({where: {email: req.body.email, password: req.body.password}})
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({"message": "no user found"});
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function resetPw(req, res) {
    models.User.findOne({where: {email: req.body.email}})
        .then((result) => {
            if (result) {
                const updatedUser = {
                    password: req.body.password,
                };
                models.User.update(updatedUser, {where: {user_id: result.user_id}})
                    .then((result) => {
                        if (result) {
                            res.status(200).json({
                                message: "Password changed successfully",
                            });
                        } else {
                            res.status(500).json({
                                error: "Internal Server Error"
                            });
                        }

                    })
                    .catch((error) => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error,
                        });
                    });
            } else {
                res.status(404).json({error: " User not found !"});
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
    index: index,
    resetPw:resetPw,
};