import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import Persona from "../components/Persona";
import LoadingScreen from "../components/LoadingScreen";
import { initializePubSubClient } from "../webPubSubClient/webPubSubClient";
import { sendMessage } from "../service/chatService";
import Spinner from "../components/Spinner";
import { selectWpsUrl } from "../selectors/userSelectors";
import { selectMessageDetailsById } from "../selectors/chatSelectors";

import "./ChatBox.scss";

const ChatBox = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const chatId = params?.id;

    const textareaRef = useRef(null);
    const msgListRef = useRef(null);

    const [newMessage, setNewMessage] = useState("");

    const { messages, isMessageLoading, chatDetail } = useSelector((state) =>
        selectMessageDetailsById(state, chatId)
    );
    const wpsUrl = useSelector(selectWpsUrl);

    useEffect(() => {
        initializePubSubClient(wpsUrl, dispatch);
    }, []);

    useEffect(() => {
        const msgList = msgListRef.current;
        if (!msgList) return;
        msgList.scrollTop = msgList.scrollHeight;
    }, [messages?.length, isMessageLoading]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.length == 0) return;
        const msgToSend = newMessage;
        setNewMessage("");
        dispatch(sendMessage({ chatId, content: msgToSend }));
    };

    const onBack = () => {
        navigate("/home");
    };

    const handleChange = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const maxRows = 3;
        const textareaLineHeight = 20; // This should match the line-height in your CSS

        textarea.rows = 1; // Reset the rows so textarea height can shrink on delete
        const currentRows = Math.floor(
            textarea.scrollHeight / textareaLineHeight
        );

        if (currentRows >= maxRows) {
            textarea.rows = maxRows;
            textarea.scrollTop = textarea.scrollHeight;
        } else {
            textarea.rows = currentRows;
        }
        setNewMessage(textarea.value);
    };

    return !messages ? (
        <LoadingScreen msg="Sharing reduces stress, increases happiness..." />
    ) : (
        <div className="chat-screen">
            <div className="chat-header">
                <button className="back-button" onClick={onBack}>
                    <FiArrowLeft size={24} />
                </button>
                <Persona title={chatDetail.partnerName} />
            </div>
            <div className="chat-messages" ref={msgListRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.timestamp}
                        className={`message ${
                            !!msg.sentBy1 ^ !!chatDetail.isUser1
                                ? "other"
                                : "self"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {isMessageLoading && <Spinner small={true} />}
            </div>
            <div className="chat-footer">
                <textarea
                    ref={textareaRef}
                    className="message-input"
                    value={newMessage}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows={1}
                />
                <button className="send-button" onClick={handleSendMessage}>
                    <IoSend size={24} />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
