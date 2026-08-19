import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import "./NoteItem.css";

const NoteItem = (props) => {

    const { note } = props;

    const { deleteNote, editNote } = useContext(NoteContext);

    const [showEdit, setShowEdit] = useState(false);

    const [editData, setEditData] = useState({
        title: note.title,
        description: note.description,
        tag: note.tag
    });


    // =======================
    // HANDLE INPUT
    // =======================

    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };


    // =======================
    // UPDATE NOTE
    // =======================

    const handleEdit = async (e) => {

        e.preventDefault();

        await editNote(
            note._id,
            editData.title,
            editData.description,
            editData.tag
        );

        setShowEdit(false);
    };


    return (
        <>
            <div className="note-card animate-fade-up">

                <div>

                    <h5 className="note-title">
                        {note.title}
                    </h5>

                    <p className="note-description">
                        {note.description}
                    </p>

                    <span className="note-tag">
                        {note.tag}
                    </span>

                </div>


                <div className="note-actions">

                    {/* EDIT */}

                    <button
                        className="note-action-btn"
                        title="Edit note"
                        onClick={() => setShowEdit(true)}
                    >
                        ✏️
                    </button>


                    {/* DELETE */}

                    <button
                        className="note-action-btn"
                        title="Delete note"
                        onClick={() => deleteNote(note._id)}
                    >
                        🗑️
                    </button>

                </div>

            </div>


            {/* =======================
                EDIT MODAL
            ======================= */}

            {showEdit && (

                <div
                    className="edit-modal-overlay"
                    onClick={() => setShowEdit(false)}
                >

                    <div
                        className="edit-modal animate-scale"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="edit-modal-header">

                            <h3>Edit Note</h3>

                            <button
                                className="modal-close"
                                onClick={() => setShowEdit(false)}
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleEdit}>

                            <div className="form-group">

                                <label>Title</label>

                                <input
                                    type="text"
                                    name="title"
                                    value={editData.title}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Description</label>

                                <textarea
                                    name="description"
                                    value={editData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Tag</label>

                                <input
                                    type="text"
                                    name="tag"
                                    value={editData.tag}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowEdit(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </>
    );
};

export default NoteItem;