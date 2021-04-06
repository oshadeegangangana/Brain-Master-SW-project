const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const news = {
        title: req.body.title,
        news_body: req.body.news_body,
        added_by: req.body.added_by,
    };

    models.News.create(news)
        .then((result) => {
            res.status(201).json({
                message: "News created successfully",
                news: result,
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

    models.News.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "News not found",
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
    models.News.findAll()
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

function indexDash(req, res) {
    models.News.findAll({
        limit: 3,
        order: [
            ['createdAt', 'DESC'],
        ]
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
    const updatedNews = {
        title: req.body.title,
        news_body: req.body.news_body,
    };

    models.News.update(updatedNews, {where: {news_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "News updated successfully",
                    news: updatedNews,
                });
            } else {
                res.status(404).json({
                    message: "News not Updated",
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

    models.News.destroy({where: {news_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "News deleted successfully",
                });
            } else {
                res.status(404).json({
                    message: "News not found",
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
    indexDash: indexDash,
    update: update,
    destroy: destroy,
};
