import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductListItem.scss";

export default function ProductListItem({ product }) {
    const navigate = useNavigate();

    const goToDetailsHandler = () => {
        navigate(`/product-details/${product.id}`);
    };

    const bidsCount = product.bids.length;
    const asksCount = product.asks.length;

    return (
        <div className="card">
            <div className="card-inner" onClick={goToDetailsHandler}>
                <div className="title">{product.productName}</div>
                <div className="description">{product.description}</div>
                <div className="trade-info">
                    Bids: {bidsCount} | Asks: {asksCount}
                </div>
            </div>
        </div>
    );
}
