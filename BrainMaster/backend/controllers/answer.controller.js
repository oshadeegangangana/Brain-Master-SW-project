const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const answer = {
        question_id: req.body.question_id,
        answered_by: req.body.answered_by,
        answer: req.body.answer,
    };

    models.Answer.create(answer)
        .then((result) => {
            res.status(201).json({
                message: "Answer created successfully",
                answer: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function show(req, res) {
    const id = req.params.id;

    models.Answer.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Answer not found",
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
    models.Answer.findAll()
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
    const updatedAnswer = {
        answer: req.body.answer,
    };

    models.Answer.update(updatedAnswer, {where: {answer_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Answer updated successfully",
                    answer: updatedAnswer,
                });
            } else {
                res.status(404).json({
                    message: "Answer not Updated",
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

    models.Answer.destroy({where: {answer_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Answer deleted successfully",
                });
            }
            else{
                res.status(404).json({
                    message: "Answer not found",
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
