import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserStatus } from "../selectors/userSelectors";

export default function ProtectedRoutes() {
    const userStatus = useSelector(selectUserStatus);

    return userStatus === "succeeded" ? <Outlet /> : <Navigate to="/" />;
}
