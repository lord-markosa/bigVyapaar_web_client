import React from "react";
import "./ConfirmationDialog.scss";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => (
    <div className="confirmation-dialog-overlay">
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-message">{message}</div>
            <div className="confirmation-dialog-actions">
                <button className="confirm-button" onClick={onConfirm}>
                    Confirm
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmationDialog;
