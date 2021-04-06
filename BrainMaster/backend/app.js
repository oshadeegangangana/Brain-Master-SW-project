const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.get('/', (req,res)=>{
    console.log("Responding to root route");
    res.send("This is the REST API of Brain Master");
});

// import routers
const usersRoute = require('./routes/user.router');
const paperRoute = require('./routes/paper.router');
const paper2Route = require('./routes/paper2.router');
const gkRoute = require('./routes/gk-question.router');
const iqRoute = require('./routes/iq-question.router');
const iqRoute2 = require('./routes/iq-question2.router');
const examRoute = require('./routes/exam.router');

const questionRoute = require('./routes/question.router');
const answerRoute = require('./routes/answer.router');
const newsRoute = require('./routes/news.router');
const eventRoute = require('./routes/event.router');
const adRoute = require('./routes/advertisment.router');
const knowledgeRoute = require('./routes/knowledge.router');


const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboards');
const passengerDashboardRoute = require('./routes/passengerdashboard');
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());


// use public folder
app.use(express.static('public'));

// use URI
app.use("/api/user",usersRoute);
app.use("/api/paper",paperRoute);
app.use("/api/paper2",paper2Route);
app.use("/api/gk",gkRoute);
app.use("/api/iq",iqRoute);
app.use("/api/iq_2",iqRoute2);
app.use("/api/exam",examRoute);

app.use("/api/question",questionRoute);
app.use("/api/answer",answerRoute);
app.use("/api/news",newsRoute);
app.use("/api/event",eventRoute);
app.use("/api/ad",adRoute);
app.use("/api/knowledge",knowledgeRoute);

app.use("/api/login",loginRoute);
app.use("/api/dashboards",dashboardRoute);
app.use("/api/passengerdashboard",passengerDashboardRoute);

module.exports = app