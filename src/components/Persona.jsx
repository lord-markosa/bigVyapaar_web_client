import React from "react";
import PersonaIcon from "./PersonaIcon";

import "./Persona.scss";

export default function Persona({ title, subtitle }) {
    const _title = title ?? "Unknown";
    return (
        <div className="persona">
            <PersonaIcon title={_title} />
            <div className="persona-info">
                <div className="persona-title">{_title}</div>
                {subtitle && <div className="persona-subtitle">{subtitle}</div>}
            </div>
        </div>
    );
}
