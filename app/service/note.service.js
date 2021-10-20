const noteModels = require('../models/note.model');

class noteService {
    createANewNote = (body, callback) => {
        noteModels.createNote(body.title, body.content, (err,data)=>{
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to find all notes
    findAllNotes = (callback) => {
        noteModels.findNotes((err,data) => {
            return err ? callback(err, null) : callback(null, data);
        });  
    }

    //query to find a single note
    findOnlyOneNote = (findId, callback) => {
        noteModels.findOneNote(findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    // Find note and update it with the request body
    updateANote = (findId, body, callback) => {
        noteModels.updateNote(findId, body.title, body.content, (err,data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to delete a note
    deleteANote = (findId, callback) => {
        noteModels.deleteNote(findId, (err,data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }
}

module.exports = new noteService();