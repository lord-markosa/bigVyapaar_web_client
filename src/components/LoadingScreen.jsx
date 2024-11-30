import React from "react";
import "./LoadingScreen.scss";
import Spinner from "./Spinner";

const LoadingScreen = ({ msg }) => (
    <div className="loading-screen-overlay">
        <Spinner />
        <div className="loadingMessage">
            {msg ?? "Sharing lightens you up..."}
        </div>
    </div>
);

export default LoadingScreen;
