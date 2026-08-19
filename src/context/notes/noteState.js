import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState(null);

    // =======================
    // SHOW ALERT
    // =======================

    const showAlert = (message, type) => {

        setAlert({
            message,
            type
        });

        setTimeout(() => {
            setAlert(null);
        }, 2500);
    };


    // =======================
    // GET ALL NOTES
    // =======================

    const getNotes = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                console.log("No authentication token found");
                setNotes([]);
                return;
            }

            const response = await fetch(
                `${host}/api/notes`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    }
                }
            );

            const json = await response.json();

            console.log(
                "GET NOTES:",
                response.status,
                json
            );

            if (response.ok && Array.isArray(json)) {

                setNotes(json);

            } else {

                console.error(
                    "Failed to get notes:",
                    json
                );

                setNotes([]);

            }

        } catch (error) {

            console.error(
                "getNotes failed:",
                error
            );

            setNotes([]);
        }
    };


    // =======================
    // ADD NOTE
    // =======================

    const addNote = async (
        title,
        description,
        tag
    ) => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                showAlert(
                    "Please login first",
                    "danger"
                );

                return;
            }

            const response = await fetch(
                `${host}/api/notes`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    },

                    body: JSON.stringify({
                        title,
                        description,
                        tag
                    })
                }
            );

            const json = await response.json();

            if (response.ok) {

                setNotes((prevNotes) => [
                    ...prevNotes,
                    json
                ]);

                showAlert(
                    "Note added successfully!",
                    "success"
                );

            } else {

                console.error(
                    "Failed to add note:",
                    json
                );

                showAlert(
                    json.error || "Failed to add note",
                    "danger"
                );
            }

        } catch (error) {

            console.error(
                "addNote failed:",
                error
            );

            showAlert(
                "Failed to add note",
                "danger"
            );
        }
    };


    // =======================
    // DELETE NOTE
    // =======================

    const deleteNote = async (id) => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                showAlert(
                    "Please login first",
                    "danger"
                );

                return;
            }

            const response = await fetch(
                `${host}/api/notes/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    }
                }
            );

            const json = await response.json();

            if (response.ok) {

                setNotes((prevNotes) =>
                    prevNotes.filter(
                        (note) => note._id !== id
                    )
                );

                showAlert(
                    "Note deleted successfully!",
                    "success"
                );

            } else {

                console.error(
                    "Delete failed:",
                    json
                );

                showAlert(
                    json.error || "Failed to delete note",
                    "danger"
                );
            }

        } catch (error) {

            console.error(
                "deleteNote failed:",
                error
            );

            showAlert(
                "Failed to delete note",
                "danger"
            );
        }
    };


    // =======================
    // UPDATE NOTE
    // =======================

    const editNote = async (
        id,
        title,
        description,
        tag
    ) => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                showAlert(
                    "Please login first",
                    "danger"
                );

                return;
            }

            const response = await fetch(
                `${host}/api/notes/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    },

                    body: JSON.stringify({
                        title,
                        description,
                        tag
                    })
                }
            );

            const json = await response.json();

            if (response.ok) {

                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note._id === id
                            ? json
                            : note
                    )
                );

                showAlert(
                    "Note updated successfully!",
                    "success"
                );

            } else {

                console.error(
                    "Update failed:",
                    json
                );

                showAlert(
                    json.error || "Failed to update note",
                    "danger"
                );
            }

        } catch (error) {

            console.error(
                "editNote failed:",
                error
            );

            showAlert(
                "Failed to update note",
                "danger"
            );
        }
    };


    return (

        <NoteContext.Provider
            value={{
                notes,
                getNotes,
                addNote,
                editNote,
                deleteNote,
                alert,
                showAlert
            }}
        >

            {props.children}

        </NoteContext.Provider>
    );
};

export default NoteState;