const models = require("../models");
const Sequelize = require("sequelize");

function show(req, res) {
    const id = req.params.id;
    const paper_type = req.body.paper_type;
    models.Paper.findAll({ where: { added_by: id , paper_type: paper_type } })
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

function showAll(req, res) {
    const paper_type = req.body.paper_type;
    const category = req.body.category;
    models.Paper.findAll({ where: { paper_type: paper_type, category: category } })
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

module.exports = {
    show: show,
    showAll: showAll,
};