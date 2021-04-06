const Validator = require("fastest-validator");
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const question = {
        paper_id: req.body.paper_id,
        question_type: req.body.question_type,
        question: req.body.question,
        option_1: req.body.option_1,
        option_2: req.body.option_2,
        option_3: req.body.option_3,
        option_4: req.body.option_4,
        answer: req.body.answer,
    };

    models.IQ_Question.create(question)
        .then((result) => {
            res.status(201).json({
                message: "IQ Question created successfully",
                question: result,
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

    models.IQ_Question.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "IQ Question not found",
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
    models.IQ_Question.findAll()
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
    const updatedQuestion = {
        question_type: req.body.question_type,
        question: req.body.question,
        option_1: req.body.option_1,
        option_2: req.body.option_2,
        option_3: req.body.option_3,
        option_4: req.body.option_4,
        answer: req.body.answer,
    };

    models.IQ_Question.update(updatedQuestion, {where: {question_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "IQ Question updated successfully",
                    paper: updatedQuestion,
                });
            } else {
                res.status(404).json({
                    message: "Question not Updated",
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

    models.IQ_Question.destroy({where: {question_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "IQ Question deleted successfully",
                });
            }
            else{
                res.status(404).json({
                    message: "Question not found",
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
