import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import "./AddNote.css";

const AddNote = () => {

    const { addNote } = useContext(NoteContext);

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    });

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addNote(
            note.title,
            note.description,
            note.tag
        );

        setNote({
            title: "",
            description: "",
            tag: ""
        });
    };

    return (
    <div className="add-note-card">

        <div className="add-note-header">
            <h2>Add a New Note</h2>
            <p>Capture your thoughts and keep them organized.</p>
        </div>

        <form onSubmit={handleSubmit}>

            <div className="add-note-group">

                <label htmlFor="title">
                    Title
                </label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    placeholder="Enter note title"
                    required
                />

            </div>

            <div className="add-note-group">

                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={note.description}
                    onChange={handleChange}
                    placeholder="Write your note..."
                    required
                />

            </div>

            <div className="add-note-group">

                <label htmlFor="tag">
                    Tag
                </label>

                <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                    placeholder="e.g. Work, Personal, Study"
                />

            </div>

            <button
                type="submit"
                className="add-note-button"
            >
                Add Note
            </button>

        </form>

    </div>
);
};

export default AddNote;