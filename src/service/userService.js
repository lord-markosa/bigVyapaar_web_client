import apiWrapper from "./apiWrapper";

export const fetchUser = apiWrapper("user/fetchUser", "/api/users/data");

export const loginUser = apiWrapper(
    "user/loginUser",
    "/api/users/login",
    "post"
);
export const registerUser = apiWrapper(
    "user/registerUser",
    "/api/users/register",
    "post"
);
