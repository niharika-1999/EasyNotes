/**
 * @file            : note.service.js
 * @author          : Niharika Rao
 * @since           : 15-10-2021
 */
const noteModels = require('../models/note.model');

class noteService {
    /**
   * @description extracting details to create a new note in the model
   */
    createANewNote = (body, color, filename, callback) => {
        noteModels.createNote(body.title, body.content, body.userId, color, filename, (err,data)=>{
            return err ? callback(err, null) : callback(null, data);
        });
    };


    /**
   * @description find all note
   */
    findAllNotes = (userId) => {
        return noteModels.findNotes(userId)  ;    
    }

    /**
   * @description find a single note
   */
    findOnlyOneNote = (userId, findId, callback) => {
        noteModels.findOneNote(userId, findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    /**
   * @description Find note and update it with the request body
   */
    updateANote = (userId, findId, body,trash,color,filename) => {
        return noteModels.updateNote(userId, findId,body,trash,color,filename);
    }

    /**
   * @description delete a note
   */
    deleteANote = (userId, findId) => {
        return noteModels.deleteNote(userId, findId)
        
    }
}

module.exports = new noteService();