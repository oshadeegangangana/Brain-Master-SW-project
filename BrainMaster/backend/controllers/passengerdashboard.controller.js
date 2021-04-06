const Validator = require("fastest-validator");
const models = require("../models");


function showPassengerById(req,res){
    const id = req.params.id;

    models.User.findOne({
        where: {
            id : id
        }
    }).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "User not found"
            })
        }
        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
}



function showPassengerJourney(req,res){
    const id = req.params.id;

    models.Journey.findAll({
        where: {
            id : id
        }
    }).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "User not found"
            })
        }
        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
}


function showPassengerViolatedRules(req,res){
    const id = req.params.id;

    models.InspectReport.findOne({
        where: {
            userId : id
        }
    }).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "User not found"
            })
        }
        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
}










module.exports = {
    showPassengerById: showPassengerById,
    showPassengerJourney: showPassengerJourney,
    showPassengerViolatedRules: showPassengerViolatedRules
  };