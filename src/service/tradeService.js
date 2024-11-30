import { createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "./makeRequest";

export const addTrade = createAsyncThunk(
    "trade/addTrade",
    async ({ productId, trade, tradeType }, thunkApi) =>
        makeRequest(
            `/api/trade/${productId}/${tradeType}`,
            "post",
            thunkApi,
            trade
        )
);

export const updateTrade = createAsyncThunk(
    "trade/updateTrade",
    async ({ productId, trade, tradeType }, thunkApi) =>
        makeRequest(
            `/api/trade/${productId}/${tradeType}/${trade.id}`,
            "put",
            thunkApi,
            trade
        )
);

export const deleteTrade = createAsyncThunk(
    "trade/deleteTrade",
    async ({ productId, tradeId, tradeType }, thunkApi) =>
        makeRequest(
            `/api/trade/${productId}/${tradeType}/${tradeId}`,
            "delete",
            thunkApi
        )
);

// todo add to store
export const requestTrade = createAsyncThunk(
    "trade/requestTrade",
    async (trade, thunkApi) =>
        makeRequest(`/api/trade/request`, "post", thunkApi, trade)
);

// todo add to store
export const respondToTrade = createAsyncThunk(
    "trade/respondToTrade",
    async ({ tradeId, response }, thunkApi) =>
        makeRequest(
            `/api/trade/respond/${tradeId}/${response}`,
            "get",
            thunkApi
        )
);

// export const updateProduct = createAsyncThunk(
//     "product/updateProduct",
//     async ({ productId, content }, thunkApi) =>
//         makeRequest(`/api/product/${productId}`, "put", thunkApi, { content })
// );

// export const deleteProduct = createAsyncThunk(
//     "product/deleteProduct",
//     async ({ productId }, thunkApi) =>
//         makeRequest(`/api/product/${productId}`, "delete", thunkApi)
// );
