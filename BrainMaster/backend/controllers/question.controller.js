const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const question = {
        asked_by: req.body.asked_by,
        question: req.body.question,
    };

    models.Question.create(question)
        .then((result) => {
            res.status(201).json({
                message: "Question created successfully",
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

    models.Question.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
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

function index(req, res) {
    models.Question.findAll({
        where: {status: 'approved'},
        // include: [
        //     {
        //         model: models.Answer, as: "answers"
        //     }
        // ],

        include: [{
            model: models.Answer,
            as: 'answers',
            include: [{
                model: models.User,
                as: 'user',
            }]
        }],
        order: [
            ['createdAt', 'DESC'],
        ],
        limit: 2,

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

function indexPending(req, res) {
    models.Question.findAll({
        where: { status: 'pending' }
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

function indexPermission(req, res) {
    models.Question.findAll({
        where: {
            [Op.or]: [
                { status: 'approved' },
                { status: 'declined' }
            ]}
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
    const updatedQuestion = {
        question: req.body.question,
        status: req.body.status,
    };

    models.Question.update(updatedQuestion, {where: {question_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Question updated successfully",
                    question: updatedQuestion,
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

    models.Question.destroy({where: {question_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Question deleted successfully",
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
    indexPending: indexPending,
    indexPermission: indexPermission,
    update: update,
    destroy: destroy,
};
