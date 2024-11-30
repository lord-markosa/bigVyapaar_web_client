import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { registerUser } from "../service/userService";
import { selectUserStatus } from "../selectors/userSelectors";

import "./Login.scss";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const userStatus = useSelector(selectUserStatus);
    const isLoading = userStatus === "loading";

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username.length === 0) {
            setError("Name cannot be empty!");
            return;
        }
        if (phoneNumber.length === 0) {
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
        if (password.length === 0) {
            setError("Password cannot be empty!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        await dispatch(registerUser({ username, phoneNumber, password }));

        if (userStatus === "succeeded") {
            navigate("/home");
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <div className="login-form">
            <div className="welcome-title">Sign Up!</div>
            <input
                type="text"
                placeholder="Name"
                className="login-input"
                value={username}
                onChange={(e) => setName(e.target.value)}
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                className="login-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
                className="login-button"
                onClick={handleRegister}
                disabled={isLoading}
            >
                Register
            </button>
            <div className="register-text">
                Already a user? <button onClick={goToLogin}>Login</button>{" "}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Register;
