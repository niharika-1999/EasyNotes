const express = require('express');
const router = express.Router();
const noteOperations = require('../controllers/notes/note.controller');
const noteValidation = require('../middleware/note.middleware');

// Create a new Note
router.post('/', noteValidation.ensureToken, noteValidation.validate, noteOperations.create);

// Retrieve all Notes
router.get('/', noteValidation.ensureToken, noteOperations.findNotes);

// Retrieve a single Note with noteId
router.get('/:noteId', noteValidation.ensureToken, noteOperations.findOne);

// Update a Note with noteId
router.put('/:noteId', noteValidation.ensureToken, noteValidation.validate, noteOperations.update);

// Delete a Note with noteId
router.delete('/:noteId', noteValidation.ensureToken, noteOperations.delete);

module.exports = router;
