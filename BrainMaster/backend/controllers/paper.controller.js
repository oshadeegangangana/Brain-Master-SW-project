const Validator = require("fastest-validator");
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const paper = {
        paper_name: req.body.paper_name,
        paper_type: req.body.paper_type,
        category: req.body.category,
        added_by: req.body.added_by,
    };

    const schema = {
        paper_name: {type: "string", optional: false},
        paper_type: {type: "string", optional: false},
    };

    const v = new Validator();
    const validateResponse = v.validate(paper, schema);

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse,
        });
    }

    models.Paper.create(paper)
        .then((result) => {
            res.status(201).json({
                message: "Paper created successfully",
                paper: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Paper name already used",
                error: error,
            });
        });
}

function show(req, res) {
    const id = req.params.id;

    models.Paper.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Paper not found",
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
    models.Paper.findAll()
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
    const updatedPaper = {
        paper_name: req.body.paper_name,
        paper_type: req.body.paper_type,
        category: req.body.category,
        added_by: req.body.added_by,
    };

    const schema = {
        paper_name: {type: "string", optional: false},
        paper_type: {type: "string", optional: false},
    };

    const v = new Validator();
    const validateResponse = v.validate(updatedPaper, schema);

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse,
        });
    }

    models.Paper.update(updatedPaper, {where: {paper_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Paper updated successfully",
                    paper: updatedPaper,
                });
            } else {
                res.status(404).json({
                    message: "Paper not updated",
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

    models.Paper.destroy({where: {paper_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Paper deleted successfully",
                });
            }
            else{
                res.status(404).json({
                    message: "Paper not found",
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
};
