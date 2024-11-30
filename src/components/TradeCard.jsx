import React from "react";
// import { useNavigate } from "react-router-dom";
import "./TradeCard.scss";
import { deleteTrade, requestTrade } from "../service/tradeService";
import { useDispatch } from "react-redux";
import getFormattedTime from "../utils/getFormattedTime";
import Persona from "./Persona";
import DropdownMenu from "./DropdownMenu";
import { useNavigate } from "react-router-dom";

export default function TradeCard(props) {
    const { trade, productId, productName, userId, tradeType, actionEnabled } =
        props;
    const { username, createdAt, price, quantity, address } = trade;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const requestHandler = () => {
        dispatch(
            requestTrade({
                tradeId: trade.id,
                userId: trade.userId,
                productId,
                productName,
                price,
                quantity,
                address,
            })
        );
    };

    const dropdownOptions = [
        {
            label: "Edit",
            onClick: () => {
                // console.log("edit");
                navigate(`/trade-form/${tradeType}/${productId}`, {
                    state: trade,
                });
            },
        },
        {
            label: "Delete",
            onClick: () => {
                // console.log("delete");
                dispatch(
                    deleteTrade({ productId, tradeId: trade.id, tradeType })
                );
            },
        },
    ];

    return (
        <div className="trade-card">
            <div className="trade-header">
                <Persona
                    title={username}
                    subtitle={getFormattedTime(createdAt)}
                />
                {trade.userId === userId && (
                    <DropdownMenu options={dropdownOptions} position="right" />
                )}
            </div>
            <div className="trade-body">
                <div className="info-sub">
                    <div className="trade-price">
                        ₹ {price} | {quantity}
                    </div>
                    <div className="trade-address">
                        {`${address.city}, ${address.state} | ${address.zip}`}
                    </div>
                </div>
                {actionEnabled && (
                    <div className="trade-actions">
                        <button onClick={requestHandler}>Request</button>
                        {/* <button onClick={editTradeHandler}>Edit</button> */}
                    </div>
                )}
            </div>
        </div>
    );
}
