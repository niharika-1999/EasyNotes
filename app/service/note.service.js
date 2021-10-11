const noteModels = require('../models/note.model');

class noteService {
    createANewNote = (title, content) => {
        noteModels.createNote(title, content);
        return note;
    }

    //query to find all notes
    findNotes = () => {
        noteModels.findNotes().then((result) => {
            console.log("From service layer: " + result);
            return result;
        }).catch();
    }

    //query to find a single note
    findOneNote = (findId) => {
        noteModels.findById(findId).then((result) => {
            console.log("From service layer: " + result);
            return result;
        }).catch();
    }

    // Find note and update it with the request body
    updateNote = (findId, title, content) => {
        noteModels.findByIdAndUpdate(findId, { title: title, content: content }, { new: true })
            .then((result) => {
                console.log("From service layer: " + result);
                return result;
            }).catch();
    }

    //query to delete a note
    deleteNote = (findId) => {
        noteModels.findByIdAndRemove(findId).then((result) => {
            console.log("From service layer: " + result);
            return result;
        }).catch();
    }
}

module.exports = new noteService();