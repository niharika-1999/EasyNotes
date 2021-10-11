module.exports = (app) => {
    const noteOperations = require('../controllers/note.controllers');
    const validateTitle = require('../middleware/note.middleware');

    // Create a new Note
    app.post('/notes', validateTitle, noteOperations.create);

    // Retrieve all Notes
    app.get('/notes', noteOperations.findNotes);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', noteOperations.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', validateTitle, noteOperations.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', noteOperations.delete);
}