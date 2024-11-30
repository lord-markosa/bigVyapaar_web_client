import React from "react";
import { useSelector } from "react-redux";
import ChatListItem from "../components/ChatListItem";
import Spinner from "../components/Spinner";
import {
    selectChats,
    selectIsNewChatLoading,
} from "../selectors/chatSelectors";

const ChatList = () => {
    const isNewChatLoading = useSelector(selectIsNewChatLoading);
    const chats = useSelector(selectChats);

    return (
        <>
            {chats.map((chat) => (
                <ChatListItem key={chat.chatId} chat={chat} />
            ))}
            {isNewChatLoading && <Spinner small={true} />}
        </>
    );
};

export default ChatList;
