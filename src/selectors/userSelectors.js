import { createSelector } from "@reduxjs/toolkit";

export const selectUsername = createSelector(
    (state) => state.user,
    (user) => user.username
);

export const selectLikedStories = createSelector(
    (state) => state.user,
    (user) => user.likedStories
);

export const selectWpsUrl = createSelector(
    (state) => state.user,
    (user) => user.wpsUrl
);

export const selectUserStatus = createSelector(
    (state) => state.user,
    (user) => user.status
);
