const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: String,
  content: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: true
});

const Note = mongoose.model('Note', NoteSchema);

class noteModels {
  createNote = (title, content, userId, callback) => {
    const note = new Note({
      title: title,
      content: content,
      userId: userId,
    });
    // Save Note in the database
    return note.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  //To find all notes
  findNotes = (userId, callback) => {
    return Note.find({ userId: userId })
      .populate({
        path: "userId",
        select: ["firstName", "lastName", "email", "phNumber"],
      })
      .exec((error, data) => {
        return error ? callback(error, null) : callback(null, data);
      });
  };

  //query to find a single note
  findOneNote = (userId, findId, callback) => {
    return Note.findOne({ userId: userId, _id: findId }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (!data) {
        return callback("You can't access this note", null);
      } else {
        return callback(null, data);
      }
    });
  }

  // Find note and update it with the request body
  updateNote = (userId, findId, body, callback) => {
    Note.findByIdAndUpdate(
      { userId: userId, _id: findId },
      {
        title: body.title,
        content: body.content,
      },
      { new: true },
      (error, data) => {
        if (error) {
          return callback(error, null);
        }
        if (!data) {
          return callback("You dont have access to this note", null);
        } else {
          return callback(null, data);
        }
      });
  }

  //query to delete a note
  deleteNote = (userId, findId, callback) => {
    Note.findByIdAndRemove({ userId: userId, _id: findId }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (!data) {
        return callback("You dont have access to this note", null);
      } else {
        return callback(null, data);
      }
    });
  }
}

module.exports = new noteModels();