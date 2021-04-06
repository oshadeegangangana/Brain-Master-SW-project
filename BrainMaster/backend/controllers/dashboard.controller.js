const Validator = require("fastest-validator");
const models = require("../models");

//Dashboard stat counts of the total registered buses and local, foreign users
function showDashboardCounts(req, res) {
  const role = "bus";
  const role1 = "local";
  const role2 = "foreign";

  models.User.count({
    where: {
      role: role,
    },
  })
    .then((result) => {
      const busCountR = result;
      models.User.count({
        where: {
          role: role1,
        },
      }).then((result) => {
        const localCountR = result;
        models.User.count({
          where: {
            role: role2,
          },
        })
          .then((result) => {
            const foreignCountR = result;
            res.status(200).json({
              busCount: busCountR,
              localCount: localCountR,
              foriegnCount: foreignCountR,
            });
          })
          .catch((error) => {
            res.status(404).json({
              message: "404 page not found",
              error: error,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

//Dashboard stat counts of the total inspected bus Vs rule violated bus
function showDashboardCharts(req, res) {
  const type = "bus";

  models.InspectedBus.count()
    .then((result) => {
      const inspectedBus = result;
      models.InspectReport.count({
        where: {
          userType: type,
        },
      })
        .then((result) => {
          const ruleViolatedBus = result;

          res.status(200).json({
            inspectedBusCount: inspectedBus,
            ruleViolatedBusCount: ruleViolatedBus,
          });
        })
        .catch((error) => {
          res.status(404).json({
            message: "404 page not found",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function showDashboardComplains(req, res) {
  models.Complaint.count()
    .then((result) => {
      const complain = result;
      models.Complaint.findAll().then((result) => {
        res.status(200).json({
          complainCount: complain,
          result,
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function showDashboardFullDetails(req, res) {
  models.TimeTable.findAll()
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


function showDashboardViolated(req, res) {


    models.InspectReport.findAll({
        group: "createdAt"
    }).then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something went wrong",
          error: error,
        });
      });
  }


  function showInspetedBusById(req, res) {

    const id = req.params.id;
    models.InspectedBus.findAll({
        where:{
          userId : id
        }
    }).then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something went wrong",
          error: error,
        });
      });
  }

module.exports = {
  showDashboardCounts: showDashboardCounts,
  showDashboardCharts: showDashboardCharts,
  showDashboardFullDetails: showDashboardFullDetails,
  showDashboardComplains: showDashboardComplains,
  showDashboardViolated: showDashboardViolated,
  showInspetedBusById: showInspetedBusById
};
