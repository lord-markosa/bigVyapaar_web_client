import { createAsyncThunk } from "@reduxjs/toolkit";
import apiWrapper from "./apiWrapper";
import makeRequest from "./makeRequest";

export const fetchMessages = createAsyncThunk(
    "chats/fetchMessages",
    async ({ chatId }, thunkApi) =>
        makeRequest(`/api/chats/${chatId}`, "get", thunkApi)
);

export const fetchNewChat = apiWrapper("user/fetchNewChat", "/api/chats/new");

export const sendMessage = createAsyncThunk(
    "chats/sendMessage",
    async ({ chatId, content }, thunkApi) =>
        makeRequest(`/api/chats/${chatId}/send`, "post", thunkApi, { content })
);
