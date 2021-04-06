const models = require("../models");
const Sequelize = require("sequelize");

function show(req, res) {
    const id = req.params.id;
    models.Paper.findOne({ where: { paper_name: id } })
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

async function findCount(req, res) {
    const paper_id = req.body.paper_id;
    const result = await models.GK_Question.findAndCountAll({
        where: {
            paper_id: paper_id
        }
    });
    res.status(200).json({
        result
    });
}

async function findCountIQ(req, res) {
    const paper_id = req.params.id;
    const result = await models.IQ_Question.findAndCountAll({
        where: {
            paper_id: paper_id
        }
    });
    res.status(200).json({
        result
    });
}

async function getExams(req, res) {
    models.Exam.findAll({
        where: {participant_user: req.params.user_id},
        include: [
            {
                model: models.Paper, as: "paper"
            }
        ]
    })
        .then((exams) => {
            res.status(200).json(exams);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message,
            });
        });
}

module.exports = {
    show: show,
    findCount: findCount,
    findCountIQ: findCountIQ,
    getExams: getExams,
};