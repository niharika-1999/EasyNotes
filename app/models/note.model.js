const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: String,
  content: String
}, {
  timestamps: true
});

const Note = mongoose.model('Note', NoteSchema);

class noteModels {
  createNote = (title, content) => {
    const note = new Note({
      title: title,
      content: content,
    });
    // Save Note in the database
    return note.save();
  };

  //To find all notes
  findNotes = () => {
    return Note.find();
  }

  //query to find a single note
  findOneNote = (findId) => {
    return Note.findById(findId);
  }

  // Find note and update it with the request body
  updateNote = (findId, title, content) => {
    return Note.findByIdAndUpdate(findId, { title: title, content: content }, { new: true });
  }

  //query to delete a note
  deleteNote = (findId) => {
    return Note.findByIdAndRemove(findId);
  }
}

module.exports = new noteModels();