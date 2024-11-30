import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";
import { requestTrade, respondToTrade } from "../service/tradeService";
import { setToken } from "../utils/token";

const initialState = {
    id: null,
    username: null,
    status: "idle",
    wpsUrl: null,
    requests: [
        {
            tradeId: 10,
            productId: 1,
            productName: "Jack Daniel",
            username: "John Doe",
            userId: 1,
            status: "pending",
            createdAt: "2021-07-01T12:00:00",
            type: "bid",
            price: 3000,
            quantity: "200 bottles",
            address: {
                street: "123 Whiskey Lane",
                city: "Lynchburg",
                state: "TN",
                zip: "37352",
            },
        },
        {
            tradeId: 11,
            productId: 2,
            productName: "Johnnie Walker",
            username: "Jane Doe",
            userId: 2,
            status: "pending",
            createdAt: "2021-07-01T12:00:00",
            type: "ask",
            price: 3500,
            quantity: "100 bottles",
            address: {
                street: "456 Whiskey Lane",
                city: "Lynchburg",
                state: "TN",
                zip: "37352",
            },
        },
    ],
    tradeRequestSent: [],
};

// Async actions
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        [fetchUser, loginUser, registerUser].forEach((apiCall) => {
            builder
                .addCase(apiCall.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(apiCall.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.id = action.payload.id;
                    state.username = action.payload.username;
                    state.requests = action.payload.requests;
                    state.wpsUrl = action.payload.negotiation.url;
                    state.tradeRequestSent = action.payload.tradeRequestSent;
                    setToken(action.payload.token);
                })
                .addCase(apiCall.rejected, (state) => {
                    state.status = "failed";
                });
        });

        builder
            .addCase(requestTrade.fulfilled, (state, action) => {
                state.tradeRequestSent.push(action.payload.tradeId);
            })
            .addCase(respondToTrade.fulfilled, (state, action) => {
                state.requests = state.requests.filter(
                    (request) => request.tradeId !== action.meta.arg.tradeId
                );
            });
    },
});

// export const {
// [TODO] Implement logout functionality
// logoutUser,
// } = userSlice.actions;

export default userSlice.reducer;
