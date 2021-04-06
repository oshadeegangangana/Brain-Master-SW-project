const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {

    let img = req.files.ad_img;
    img.mv('public/ads/' + img.name)
        .then((result) => {
        console.log(result);
        let status = "pending";

        const advertisement = {
            desc: req.body.desc,
            ad_img: req.files.ad_img.name,
            status: status,
            added_by: req.body.added_by,
        };

        models.Advertisement.create(advertisement)
            .then((result) => {
                res.status(201).json({
                    message: "Advertisement created successfully",
                    advertisement: result,
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

    models.Advertisement.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Advertisement not found",
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
    models.Advertisement.findAll({
        where: {
        [Op.or]: [
            { status: 'approved' },
            { status: 'declined' }
        ]
    }
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

function indexApproved(req, res) {
    models.Advertisement.findAll({
        where: {status: 'approved'}
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
    models.Advertisement.findAll({
        where: {status: 'pending'}
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
    const updatedAdvertisement = {
        desc: req.body.desc,
        ad_img: req.body.ad_img,
        status: req.body.status,
        approved_by: req.body.approved_by,
    };

    models.Advertisement.update(updatedAdvertisement, {where: {ad_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Advertisement updated successfully",
                    advertisement: updatedAdvertisement,
                });
            } else {
                res.status(404).json({
                    message: "Advertisement not Updated",
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

    models.Advertisement.destroy({where: {ad_id: id}})
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: "Advertisement deleted successfully",
                });
            }
            else{
                res.status(404).json({
                    message: "Advertisement not found",
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
    indexApproved: indexApproved,
    indexPending: indexPending,
    update: update,
    destroy: destroy,
};
