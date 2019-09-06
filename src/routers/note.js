const express = require("express");

const authenticate = require("../middleware/auth");
const noteService = require("../services/noteService");
const { validateCreateNote, validateUpdateNote, validateDeleteNoteById } = require("../middleware/validators/notes");

const router = express.Router();

router.get("/:id", authenticate, (req, res) => {
    noteService.getNoteById(req.params.id)
        .then(note => {
            res.send({
                data: {
                    note
                }
            });
        })
        .catch(e => {
            res.status(500).send({ error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            });
        });
});

router.get("/", authenticate, (req, res) => {
    noteService.getAllNotesByUserId(req.user._id)
        .then(notes => {
            res.send({
                data: {
                    notes: notes.map(note => note.toJSON())
                }
            })
        })
        .catch(e => {
            res.status(500).send({ error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            });
        });
});

router.post("/", authenticate, validateCreateNote, (req, res) => {
    const note = req.body;
    const userId = req.user._id;
    noteService.createNoteForUser(note, userId)
        .then(newNote => {
            res.status(201).send({
                data: {
                   note: newNote 
                }
            });
        })
        .catch(e => {
            res.status(500).send({ 
                error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            });
        });
});

router.put("/:id", authenticate, validateUpdateNote, (req, res) => {
    noteService.updateNoteById(req.params.id, req.body)
        .then( note => {
            res.status(200).send({
                data: {
                    note: note.toJSON() 
                }
            });
        })
        .catch( e => {
            res.status(500).send({
                error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            });
        });
})

router.delete("/all", authenticate, (req, res) => {
    noteService.deleteAllNotesByUserId(req.user._id)
        .then(note => {
            res.status(204).send();
        })
        .catch(e => {
            res.status(500).send({ error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            });
        });
})

router.delete("/:id", authenticate, validateDeleteNoteById, (req, res) => {
    noteService.deleteNoteById(req.params.id)
        .then(note => {
            res.status(204).send();
        })
        .catch(e => {
            res.status(500).send({ error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            });
        });
})

module.exports = router;