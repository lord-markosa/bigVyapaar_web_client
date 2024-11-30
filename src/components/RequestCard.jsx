import React from "react";
import "./RequestCard.scss";
import { respondToTrade } from "../service/tradeService";
import { useDispatch } from "react-redux";
import getFormattedTime from "../utils/getFormattedTime";

export default function RequestCard({ request }) {
    const {
        // productId,
        productName,
        tradeId,
        username,
        // userId,
        // status,
        createdAt,
        // type,
        price,
        quantity,
        address,
    } = request;

    const dispatch = useDispatch();

    const onAccept = () => {
        console.log(request);
        dispatch(
            respondToTrade({
                response: "accept",
                tradeId,
                requestId: request.id,
            })
        );
    };

    const onReject = () => {
        console.log(request);
        dispatch(
            respondToTrade({
                response: "reject",
                tradeId,
                requestId: request.id,
            })
        );
    };

    return (
        <div className="request-card">
            <div className="info-main">
                <div className="req-product">{productName}</div>
                <div className="req-price">
                    ₹ {price} | {quantity}
                </div>
            </div>
            <div className="info-sub">{username}</div>
            <div className="info-sub">
                <div className="req-address">
                    {`${address.city}, ${address.state} | ${address.zip}`}
                </div>
                <div className="timestamp">{getFormattedTime(createdAt)}</div>
            </div>
            <div className="req-actions">
                <button onClick={onAccept}>Accept</button>
                <button onClick={onReject}>Reject</button>
                {/* <button onClick={editTradeHandler}>Edit</button> */}
            </div>
        </div>
    );
}
