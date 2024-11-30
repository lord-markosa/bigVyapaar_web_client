import { createSelector } from "@reduxjs/toolkit";

export const selectIsNewChatLoading = createSelector(
    (state) => state.chat,
    (chat) => chat.isNewChatLoading
);

export const selectChats = createSelector(
    (state) => state.chat,
    (chat) => chat.chats
);

const selectMessagesById = createSelector(
    (state) => state.chat,
    (chat) => chat.messagesById
);

const selectIsMessageLoadingById = createSelector(
    (state) => state.chat,
    (chat) => chat.isMessageLoadingById
);

export const selectMessageDetailsById = createSelector(
    [
        (_, chatId) => chatId,
        selectChats,
        selectMessagesById,
        selectIsMessageLoadingById,
    ],
    (chatId, chats, messagesById, isMessageLoadingById) => ({
        isMessageLoading: isMessageLoadingById[chatId],
        messages: messagesById[chatId],
        chatDetail: chats.find((chat) => chat.chatId === chatId),
    })
);
