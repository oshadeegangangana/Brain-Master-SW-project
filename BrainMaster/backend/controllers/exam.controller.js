const Validator = require("fastest-validator");
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const exam = {
        paper_id: req.body.paper_id,
        participant_user: req.body.participant_user,
        marks: req.body.marks,
        grade: req.body.grade,
    };

    models.Exam.create(exam)
        .then((result) => {
            res.status(201).json({
                message: "Exam created successfully",
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

    models.Exam.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Exam not found",
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
    models.Exam.findAll()
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
    const updatedExam = {
        marks: req.body.marks,
        grade: req.body.grade,
    };

    models.Exam.update(updatedExam, {where: {exam_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Exam updated successfully",
                    exam: updatedExam,
                });
            } else {
                res.status(404).json({
                    message: "Exam not Updated",
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

    models.Exam.destroy({where: {exam_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Exam deleted successfully",
                });
            }
            else{
                res.status(404).json({
                    message: "Exam not found",
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

function getExam(req, res) {
    models.Exam.findOne({where: {paper_id:req.params.paper_id, participant_user: req.params.user_id}})
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

async function examCount(req, res) {

    const result = await models.Exam.findAndCountAll({
        where: {
            paper_id: req.params.paper_id, participant_user: req.params.user_id
        }
    });
    res.status(200).json({
        result
    });
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
    getExam: getExam,
    examCount: examCount,
};
