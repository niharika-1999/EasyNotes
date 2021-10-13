const express = require('express');
const router = express.Router();
const noteOperations = require('../controllers/note.controllers');
const validateTitle = require('../middleware/note.middleware');

// Create a new Note
router.post('/notes', validateTitle, noteOperations.create);

// Retrieve all Notes
router.get('/notes', noteOperations.findNotes);

// Retrieve a single Note with noteId
router.get('/notes/:noteId', noteOperations.findOne);

// Update a Note with noteId
router.put('/notes/:noteId', validateTitle, noteOperations.update);

// Delete a Note with noteId
router.delete('/notes/:noteId', noteOperations.delete);

module.exports = router;