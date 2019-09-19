const request = require("supertest");
const app = require("../src/app");
const {setUpDatabase, testOneUserId, testOneUserToken, testOneUserNoteId, testOneUserNote} = require("./fixtures/db");
const Note = require("../src/models/note");

beforeEach(setUpDatabase);

test("Should create note", async () => {
    const response = await request(app).post("/notes")
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send({
            description: 'noteOne'
        }).expect(201);

    // Assert that response is correct
    expect(response.body.data.note.description).toEqual('noteOne');

    // Assert that the note is saved in the database
    const note = await Note.findById(response.body.data.note.id); 
    expect(note).toMatchObject({
        description: 'noteOne'
    })
});

test("Should get all notes for the logged in user", async () => {
    const response = await request(app).get("/notes")
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send().expect(200);
    
    // Assert that notes in the database and response from request is same 
    const notes = await Note.find({userId: testOneUserId}); 
    expect(response.body.data.notes.length).toEqual(notes.length);;
});

test("Should get note by Id", async () => {
    const response = await request(app).get(`/notes/${testOneUserNoteId}`)
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send().expect(200);
    
    // Assert that the response is correct
    expect({ 
        id:testOneUserNote._id.toString(),
        description: testOneUserNote.description
    }).toMatchObject({
        id: response.body.data.note.id,
        description: response.body.data.note.description
    });
});

test("Should update note by Id", async () => {
    const response = await request(app).put(`/notes/${testOneUserNoteId}`)
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send({description: 'updatedDescription'})
        .expect(200);
    
    // Assert that the data is updated in database
    const note = await Note.findOne({_id: testOneUserNoteId});
    expect(note.description).toEqual(response.body.data.note.description);
});

test("Should delete note by id", async () => {
    const response = await request(app).delete(`/notes/${testOneUserNoteId}`)
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send()
        expect(204);
    
    // Assert that the data is delete from database
    const note = await Note.findOne({_id: testOneUserNoteId});
    expect(note).toBeNull();
});

test("Should delete all note from given logged in user", async () => {
    const response = await request(app).delete("/notes/all")
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send()
        .expect(204);
    
    // Assert that all note for the given user is deleted
    const note = await Note.find({userId: testOneUserId}); 
    expect(note.length).toEqual(0);
});