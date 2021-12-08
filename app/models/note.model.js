/**
 * @file            : note.model.js
 * @author          : Niharika Rao
 * @since           : 15-10-2021
 */
const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: String,
  content: String,
  color: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isTrash:Boolean,
  profileImg: {
    type: String
  } 
}, {
  timestamps: true
});

const Note = mongoose.model('Note', NoteSchema);

class noteModels {
   /**
   * @description  To create a note and save in database
   * @returns result of callback
   */
  createNote = (title, content, userId,filename,callback) => {
    const note = new Note({
      title: title,
      content: content,
      userId: userId,
      isTrash:false,
      profileImg:filename, 
    });
    return note.save((err,data) => {
      return err? callback(err,null):callback(null,data);
    });
  };

   /**
   * @description To find all notes
   * @param {String} userId
   */
  findNotes = (userId) => {
    return Note.find({userId: userId})
    .populate({
      path: "userId",
      select: ["firstName", "lastName", "email"]
  });
};

  /**
   * @description To find one specific note
   * @param {String} userId
   * @param {String} findId
   */
   findOneNote = (userId, findId) => {
    return Note.findOne({ userId: userId, _id: findId });
  };

  /**
   * @description Find note and update it with the request body
   * @param {String} userId
   * @param {String} findId
   * @param {String} body
   * @param {Boolean} trash
   * @param {String} filename
   */
  updateNote = (userId, findId, body,trash,color,filename) => {
    return Note.findByIdAndUpdate(
      { userId: userId, _id: findId },
      {
        title: body.title,
        content: body.content,
        isTrash:trash,
        color:color,
        profileImg:filename
      },
      { new: true });
      };

  /**
   * @description Query to find and remove a note
   * @param {String} findId
   * @param {String} userId
   */
  deleteNote = (userId, findId) => {
    return Note.findByIdAndRemove({ userId: userId, _id: findId });
    
  };
}

module.exports = new noteModels();