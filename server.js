/* *             
 * @file            : server.js
 * @author          : Niharika Rao
 * @since           : 15-10-2021
 **/

const express = require('express');
const bodyParser = require('body-parser');
const routeUsers = require('./app/routes/user.routes');
const routeNotes = require('./app/routes/note.routes');
const dbConnect = require('./config/dbConnect');
const logger = require('./config/winstonLogger');
const routeLabels = require('./app/routes/label.routes');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const cors = require('cors');
const app = express();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,   
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/notes', routeNotes);
app.use('/users', routeUsers);
app.use('/labels',routeLabels)
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));
app.use('/images', express.static('app/public'));

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to FundooNotes application. Take notes quickly. Organize and keep track of all your notes."});
    logger.info("Welcome to FundooNotes application. Take notes quickly.");
});

// listen for requests
const server=app.listen(5000, () => {
    console.log("Server is listening on port 5000.");
    logger.info("Server is listening on port 5000.");
    dbConnect;
});
module.exports=server;












