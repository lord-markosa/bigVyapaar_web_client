import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
    name: "appConfig",
    initialState: {
        toastMessage: null,
        showToast: false,
        activeTabIndex: 0,
    },
    reducers: {
        showToast: (state, action) => {
            state.toastMessage = action.payload;
            state.showToast = true;
        },
        hideToast: (state) => {
            state.toastMessage = null;
            state.showToast = false;
        },
        toggleActiveTab: (state, action) => {
            state.activeTabIndex = action.payload;
        },
    },

    extraReducers: (/* builder */) => {},
});

export const { showToast, hideToast, toggleActiveTab } = appConfigSlice.actions;

export default appConfigSlice.reducer;
