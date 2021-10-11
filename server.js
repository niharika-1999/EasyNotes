const express = require('express');
const app = express();
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(express.json());


//adding a logger
const logger = require('./winstonLogger.js');

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");   
    logger.info("Connected to Database"); 
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    logger.info("Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.");
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
    logger.info("Server is listening on port 3000.");
});