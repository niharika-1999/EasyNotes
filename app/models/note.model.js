const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: String,
  content: String
}, {
  timestamps: true
});

const Note = mongoose.model('Note', NoteSchema);

class noteModels {
  createNote = (title, content, callback) => {
    const note = new Note({
      title: title,
      content: content,
    });
    // Save Note in the database
    return note.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  //To find all notes
  findNotes = (callback) => {
    return Note.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  }

  //query to find a single note
  findOneNote = (findId, callback) => {
    Note.findById(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  }

  // Find note and update it with the request body
  updateNote = (findId, title, content, callback) => {
    Note.findByIdAndUpdate(
      findId,
      {
        title: title,
        content: content,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
  }

  //query to delete a note
  deleteNote = (findId, callback) => {
    Note.findByIdAndRemove(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  }
}

module.exports = new noteModels();