import React from "react";
import { useNavigate } from "react-router-dom";
import Persona from "./Persona";

import "./ChatListItem.scss";

export default function ChatListItem({ chat }) {
    const navigate = useNavigate();
    const { partnerName, chatId } = chat;
    const onClick = () => navigate(`/chat/${chatId}`);

    return (
        <div className="chatListItem" onClick={onClick}>
            <Persona title={partnerName} />
        </div>
    );
}
