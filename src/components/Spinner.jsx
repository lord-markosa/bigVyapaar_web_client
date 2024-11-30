import React from "react";
import "./Spinner.scss";

const Spinner = ({ small }) => (
    <div className="spinner-container">
        <div className={`loading-spinner ${small ? "small" : ""}`} />
    </div>
);

export default Spinner;
