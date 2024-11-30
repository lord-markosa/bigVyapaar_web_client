let token = null;

export const getToken = () => {
    if (token) {
        return token;
    }

    token = localStorage.getItem("token");
    return token;
};

export const setToken = (newToken) => {
    if (!newToken) {
        return;
    }

    localStorage.setItem("token", newToken);
    token = newToken;
};
