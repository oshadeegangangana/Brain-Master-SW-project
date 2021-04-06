const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const event = {
        title: req.body.title,
        desc: req.body.desc,
        date: req.body.date,
        venue: req.body.venue,
        added_by: req.body.added_by,
    };

    models.Event.create(event)
        .then((result) => {
            res.status(201).json({
                message: "Event created successfully",
                event: result,
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

    models.Event.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Event not found",
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
    models.Event.findAll()
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
    models.Event.findAll({
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
    const updatedEvent = {
        title: req.body.title,
        desc: req.body.desc,
        date: req.body.date,
        venue: req.body.venue,
    };

    models.Event.update(updatedEvent, {where: {event_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Event updated successfully",
                    event: updatedEvent,
                });
            } else {
                res.status(404).json({
                    message: "Event not Updated",
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

    models.Event.destroy({where: {event_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Event deleted successfully",
                });
            } else {
                res.status(404).json({
                    message: "Event not found",
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
