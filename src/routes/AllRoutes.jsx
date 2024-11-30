import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ChatBox from "../pages/ChatBox";
import { fetchUser } from "../service/userService";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { fetchMessages } from "../service/chatService";
import NewProduct from "../pages/NewProduct";
import ProductDetails from "../pages/ProductDetails";
import TradeForm from "../pages/TradeForm";
import getToken from "../utils/token";

const AllRoutes = () => {
    const dispatch = useDispatch();
    const token = getToken();
    const router = createBrowserRouter([
        {
            loader: async () => {
                if (token) {
                    await dispatch(fetchUser());
                }
                return null;
            },
            children: [
                {
                    element: <AuthRoutes />,
                    children: [
                        {
                            index: true,
                            path: "*",
                            element: <Login />,
                        },
                        {
                            path: "login",
                            element: <Login />,
                        },
                        {
                            path: "register",
                            element: <Register />,
                        },
                    ],
                },
                {
                    element: <ProtectedRoutes />,
                    children: [
                        {
                            path: "home",
                            element: <Home />,
                            // [TODO] Add children to Home
                            // children: [
                            //     {
                            //         index: true,
                            //         element: <ProductList />,
                            //     },
                            //     {
                            //         path: "chats",
                            //         element: <ChatList />,
                            //     },
                            // ],
                        },
                        {
                            path: "chat/:id",
                            element: <ChatBox />,
                            loader: ({ params }) => {
                                const chatId = params?.id;
                                if (chatId) {
                                    dispatch(fetchMessages({ chatId }));
                                }
                                return null;
                            },
                        },
                        {
                            path: "product-form",
                            element: <NewProduct />,
                        },
                        {
                            path: "product-details/:productId",
                            element: <ProductDetails />,
                        },
                        {
                            path: "trade-form/:tradeType/:productId",
                            element: <TradeForm />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AllRoutes;
