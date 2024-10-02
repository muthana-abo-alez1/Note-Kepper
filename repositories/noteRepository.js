const Note = require('../models/Note');

exports.createNote = async (title, content) => {
  const note = new Note({ title, content });
  return await note.save();
};

exports.getAllNotes = async (page, limit) => {
    const skip = (page - 1) * limit; 
    return await Note.find()
      .skip(skip)         
      .limit(Number(limit)); 
  };

exports.getNoteById = async (id) => {
  return await Note.findById(id);
};

exports.updateNoteById = async (id, title, content) => {
  return await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true, runValidators: true }
  );
};

exports.deleteNoteById = async (id) => {
  return await Note.findByIdAndDelete(id);
};

exports.searchNotes = async (query) => {
    const regex = new RegExp(query, 'i'); 
    return await Note.find({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } }
      ]
    });
  };