import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { loginUser } from "../service/userService";
import { selectUserStatus } from "../selectors/userSelectors";

import "./Login.scss";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const userStatus = useSelector(selectUserStatus);
    const isLoading = userStatus === "loading";

    const handleLogin = async (e) => {
        e.preventDefault();
        if (phoneNumber.length == 0) {
            setError("Phone Number cannot be empty!");
            return;
        }
        if (phoneNumber.length !== 10) {
            setError("Phone Number must be of 10 digits!");
            return;
        }
        if (isNaN(phoneNumber)) {
            setError("Phone Number must be a number!");
            return;
        }
        if (password.length == 0) {
            setError("Password cannot be empty!");
            return;
        }

        // [TODO] Call the loginUser service
        await dispatch(loginUser({ phoneNumber, password }));

        if (userStatus === "succeeded") {
            navigate("/home");
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <div className="login-form">
            <div className="welcome-title">Login In!</div>
            <input
                type="text"
                placeholder="Phone Number"
                className="login-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="login-button"
                onClick={handleLogin}
                disabled={isLoading}
            >
                Login
            </button>
            <div className="register-text">
                New here? <button onClick={goToRegister}>Register</button> now
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Login;
