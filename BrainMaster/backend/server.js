const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;

const server = http.createServer(app);

app.listen(port, () => {
    console.log('Server Started and listening on: ' + port );
});