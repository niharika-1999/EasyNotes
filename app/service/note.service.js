const noteModels = require('../models/note.model');

class noteService {
    createANewNote = (body, callback) => {
        noteModels.createNote(body.title, body.content, body.userId, (err,data)=>{
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to find all notes
    findAllNotes = (userId, callback) => {
        noteModels.findNotes(userId, (err,data) => {
            return err ? callback(err, null) : callback(null, data);
        });  
    }

    //query to find a single note
    findOnlyOneNote = (userId, findId, callback) => {
        noteModels.findOneNote(userId, findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    // Find note and update it with the request body
    updateANote = (userId, findId, body, callback) => {
        noteModels.updateNote(userId, findId, body.title, body.content, (err,data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to delete a note
    deleteANote = (userId, findId, callback) => {
        noteModels.deleteNote(userId, findId, (err,data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }
}

module.exports = new noteService();