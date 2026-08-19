import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import "./Alert.css";

const Alert = () => {

    const { alert } = useContext(NoteContext);

    if (!alert) {
        return null;
    }

    const alertType = alert.type === "danger" ? "danger" : alert.type === "success" ? "success" : "info";

    return (
        <div className={`custom-alert ${alertType}`} role="alert" aria-live="polite">
            <span className="alert-icon" aria-hidden="true">
                {alertType === "success" ? "✓" : "!"}
            </span>

            <div className="alert-content">
                <strong className="alert-title">
                    {alertType === "success" ? "Success" : "Error"}
                </strong>
                <span className="alert-message">
                    {alert.message}
                </span>
            </div>
        </div>
    );
};

export default Alert;