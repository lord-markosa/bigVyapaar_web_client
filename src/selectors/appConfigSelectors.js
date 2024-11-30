import { createSelector } from "@reduxjs/toolkit";

export const selectToastData = createSelector(
    (state) => state.appConfig,
    (appConfig) => ({
        message: appConfig.toastMessage,
        show: appConfig.showToast,
    })
);

export const selectActiveTabIndex = createSelector(
    (state) => state.appConfig,
    (appConfig) => appConfig.activeTabIndex
);
