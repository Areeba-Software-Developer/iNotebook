const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');

// =======================
// GET ALL NOTES
// =======================

router.get('/', fetchUser, async (req, res) => {
    try {

        const notes = await Notes.find({
            user: req.user.id
        });

        res.json(notes);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// =======================
// ADD A NOTE
// =======================

router.post('/', fetchUser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        const note = new Notes({
            user: req.user.id,
            title,
            description,
            tag
        });

        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// =======================
// UPDATE AN EXISTING NOTE
// =======================

router.put('/:id', fetchUser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        const newNote = {};

        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tag) {
            newNote.tag = tag;
        }

        // Find note
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                error: "Note not found"
            });
        }

        // Check ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                error: "Not Allowed"
            });
        }

        // Update note
        note = await Notes.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                $set: newNote
            },
            {
                new: true
            }
        );

        res.json(note);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// =======================
// DELETE A NOTE
// =======================

router.delete('/:id', fetchUser, async (req, res) => {
    try {

        // Find note
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                error: "Note not found"
            });
        }

        // Check ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                error: "Not Allowed"
            });
        }

        // Delete note
        await Notes.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Note has been deleted"
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;