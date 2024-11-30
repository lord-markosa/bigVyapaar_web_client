import React from "react";

import "./ToggleSlider.scss";

const ToggleSlider = ({ tabs, tabIndex, handleTabChange }) => (
    <div className="toggle-slider">
        <div className={`slider position-${tabIndex}`} />
        <div className="tabs">
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={`tab ${tabIndex === index ? "active" : ""}`}
                    onClick={() => handleTabChange(index)}
                >
                    {tab}
                </div>
            ))}
        </div>
    </div>
);

export default ToggleSlider;
