const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 500 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{
    timestamps: true
}); 

noteSchema.methods.toJSON = function() {
    const note = this.toObject();
    note.id = note._id;
    delete note._id;
    delete note.__v;
    return note;
}

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;