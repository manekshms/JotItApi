const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Note = require("../../src/models/note");
const config = require("../../config/index");

const testOneUserId = new mongoose.Types.ObjectId();
const testOneUserToken = {_id: testOneUserId, token: jwt.sign({id: testOneUserId}, config.jwtSecret)} 
const testOneUser = {
    "_id": testOneUserId,
    "name": "testOne User",
    "email": "testoneuser@gmail.com",
    "age": 34,
    "gender": "female",
    "username": "testoneuser",
    "password": "Testoneuser@1234",
    "tokens": [testOneUserToken]
}

const testOneUserNoteId = new mongoose.Types.ObjectId();

const testOneUserNote = {
    _id: testOneUserNoteId,
    description: "testOneUserNote",
    userId: testOneUserId
};
const setUpDatabase = async () => {
    await User.deleteMany();
    await Note.deleteMany();
    await User.create(testOneUser);
    await Note.create(testOneUserNote);
}

module.exports = {
    testOneUserId,
    testOneUserToken,
    testOneUser,
    testOneUserNoteId,
    testOneUserNote,
    setUpDatabase
}
