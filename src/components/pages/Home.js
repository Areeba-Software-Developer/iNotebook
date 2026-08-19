import React, { useContext, useEffect } from "react";
import NoteContext from "../../context/notes/noteContext";
import NoteItem from "../NoteItem";
import AddNote from "../AddNote";
import "./Home.css";


const Home = () => {

    const context = useContext(NoteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, []);

    return (
       <div className="home-page">

    <div className="home-container">

        <div className="home-header">
            <div>
                <h1>Welcome to iNotebook</h1>
                <p>Organize your thoughts and keep your notes in one place.</p>
            </div>

            <div className="notes-count">
                <span className="notes-count-number">
                    {notes.length}
                </span>
                Notes
            </div>
        </div>

        <div className="add-note-section">
            <AddNote />
        </div>

        <div className="notes-section-header">
            <h2>Your Notes</h2>
            <span>{notes.length} total</span>
        </div>

        <div className="notes-container">
            {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <NoteItem key={note._id || note.id} note={note} />
                ))
            ) : (
                <p>No notes to display.</p>
            )}
        </div>

    </div>

    </div>
    );
}

export default Home;