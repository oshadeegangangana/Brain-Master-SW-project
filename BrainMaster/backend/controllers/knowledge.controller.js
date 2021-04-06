const models = require("../models");

function save(req, res) {

    let file = req.files.file;
    file.mv('public/knowledge/' + file.name)
        .then((result) => {
            console.log(result);
            const knowledge = {
                desc: req.body.desc,
                file: req.files.file.name,
                added_by: req.body.added_by,
            };

            models.Knowledge.create(knowledge)
                .then((result) => {
                    res.status(201).json({
                        message: "Knowledge created successfully",
                        knowledge: result,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error,
                    });
                });
        }).catch(error => {
        res.status(500).json(error.message);
    });


}

function show(req, res) {
    const id = req.params.id;

    models.Knowledge.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Knowledge not found",
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
    models.Knowledge.findAll()
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
    const updatedKnowledge = {
        Knowledge: req.body.Knowledge,
    };

    models.Knowledge.update(updatedKnowledge, {where: {knowledge_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Knowledge updated successfully",
                    knowledge: updatedKnowledge,
                });
            } else {
                res.status(404).json({
                    message: "Knowledge not Updated",
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

    models.Knowledge.destroy({where: {knowledge_id: id}})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Knowledge deleted successfully",
                });
            } else {
                res.status(404).json({
                    message: "Knowledge not found",
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
