import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import chatSlice from "./chatSlice";
import appConfigSlice from "./appConfigSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        product: productSlice,
        chat: chatSlice,
        appConfig: appConfigSlice,
    },
});

export default store;
