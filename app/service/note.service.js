const noteModels = require('../models/note.model');

class noteService {
    createANewNote = (title, content) => {
        noteModels.createNote(title, content);
        return noteModels.createNote(title,content);
    }

    //query to find all notes
    findAllNotes = () => {
        noteModels.findNotes();
        return noteModels.findNotes();
    }

    //query to find a single note
    findOnlyOneNote = (findId) => {
        noteModels.findOneNote(findId);
        return noteModels.findOneNote(findId);
    }

    // Find note and update it with the request body
    updateANote = (findId, title, content) => {
        noteModels.updateNote(findId, { title: title, content: content }, { new: true });
        return noteModels.updateNote(findId, title, content);
    }

    //query to delete a note
    deleteANote = (findId) => {
        noteModels.deleteNote(findId);
        return noteModels.deleteNote(findId);
    }
}

module.exports = new noteService();