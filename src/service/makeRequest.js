import axios from "axios";
import { showToast } from "../store/appConfigSlice";
import { API_URL } from "../utils/apiUrl";
import { getToken } from "../utils/token";

const makeRequest = async (
    url,
    method,
    { dispatch, rejectWithValue },
    data
) => {
    const token = getToken();
    try {
        const response = await axios({
            method,
            url: `${API_URL}${url}`,
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "An error occurred";
        dispatch(showToast(errorMessage));
        return rejectWithValue(errorMessage);
    }
};

export default makeRequest;
