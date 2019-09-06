const Note = require("../models/note");

const createNoteForUser = async (note, userId) => {
    note.userId = userId;
    const newNote = new Note(note);
    try{
        await newNote.save();
    }catch(e) {
        throw new Error('Something went wrong!');
    }
    return newNote;
}

const updateNoteById = async (id, noteData) => {
    let note = null;
    try {
        note = await Note.findOneAndUpdate(id, noteData, {new: true});
    }catch(e) {
        throw new Error("Something went wrong!");
    }
    return note;
}

const getNoteById = async (id) => {
    let note = null;
    try{
        note = await Note.findOne({_id: id})
    }catch(e) {
        throw new Error("Something went wrong!");
    }
    return note;
}

const getAllNotesByUserId = async (userId) => {
    let notes = [];
    try{
        notes = await Note.find({userId});
    }catch(e) {
        throw new Error("Something went wrong!");
    }
    return notes;
}

const deleteNoteById = async (id) => {
    let note = null;
    try{
        note = await Note.findOneAndDelete({_id: id});
    }catch(e) {
        throw new Error("Something went wrong!");
    }
    return note;
}

const deleteAllNotesByUserId = async (userId) => {
    let notes = [];
    try{
        notes = await Note.deleteMany({userId});
    }catch(e) {
        console.log(e);
        throw new Error("Something went wrong!");
    }
    return notes;
}

module.exports = {
    createNoteForUser,
    updateNoteById,
    getAllNotesByUserId,
    getNoteById,
    deleteNoteById,
    deleteAllNotesByUserId
};

