import React from "react";
import "./PersonaIcon.scss";

const colors = ["#1145a5", "#ee3535", "#0c6104", "#640a9d"];

const getColor = (title) => {
    const idx = title.charCodeAt(1) % 4;
    return colors[idx];
};

export default function PersonaIcon({ title }) {
    const letter = title[0].toUpperCase();

    return (
        <div
            className="persona-icon"
            style={{ backgroundColor: getColor(title) }}
        >
            <div className="letter">{letter}</div>
        </div>
    );
}
