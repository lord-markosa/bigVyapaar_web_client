import { createAsyncThunk } from "@reduxjs/toolkit";
import apiWrapper from "./apiWrapper";
import makeRequest from "./makeRequest";

export const addProduct = apiWrapper(
    "product/addProduct",
    "/api/product",
    "post"
);

export const likeProduct = createAsyncThunk(
    "product/likeProduct",
    async ({ productId }, thunkApi) =>
        makeRequest(`/api/product/${productId}/like`, "get", thunkApi)
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ productId, content }, thunkApi) =>
        makeRequest(`/api/product/${productId}`, "put", thunkApi, { content })
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async ({ productId }, thunkApi) =>
        makeRequest(`/api/product/${productId}`, "delete", thunkApi)
);
