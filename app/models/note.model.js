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
      title: title || "Untitled Note",
      content: content,
    });
    // Save Note in the database
    return note.save().then().catch();
  };

  //To find all notes
  findNotes = () => {
    return Note.find().then((result) => {
      return result;
    }).catch(err => {
      console.log(err);
    });
  }

  //query to find a single note
  findOneNote = async (findId) => {
    try {
      const result = await Note.findById(findId);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // Find note and update it with the request body
  updateNote = (findId, title, content) => {
    return Note.findByIdAndUpdate(findId, { title: title, content: content }, { new: true })
      .then((result) => {
        return result;
      }).catch(err => {
        console.log(err);
      });
  }

  //query to delete a note
  deleteNote = (findId) => {
    return Note.findByIdAndRemove(findId).then((result) => {
      return result;
    }).catch(err => {
      console.log(err);
    });
  }
}

module.exports = new noteModels();