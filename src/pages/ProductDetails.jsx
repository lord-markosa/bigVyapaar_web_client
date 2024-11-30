import React from "react";
import "./ProductDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import TradeCard from "../components/TradeCard";
import { useSelector } from "react-redux";

export default function ProductDetails() {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.id);
    const params = useParams();
    const productId = params.productId;

    const product = useSelector((state) => {
        return state.product.productList.find(
            (product) => product.id === productId
        );
    });

    const tradeRequestSent = useSelector(
        (state) => state.user.tradeRequestSent
    );

    // useEffect(() => {
    // Fetch product details based on productId
    // Example: fetchProductDetails(productId);
    // }, [productId]);

    if (!product) {
        // todo: load the product
        return <div>Loading...</div>;
    }

    const onNewTrade = (tradeType) => {
        navigate(`/trade-form/${tradeType}/${product.id}`);
    };

    return (
        <>
            <div className="root">
                <div className="product-info">
                    <div className="title">{product.productName}</div>
                    <div className="description">{product.description}</div>
                </div>
                <div className="trade-header">BIDs</div>
                {product.bids.map((bid) => (
                    <TradeCard
                        userId={userId}
                        trade={bid}
                        productId={product.id}
                        productName={product.productName}
                        key={bid.id}
                        tradeType="bid"
                        actionEnabled={
                            bid.userId !== userId &&
                            !tradeRequestSent.includes(bid.id)
                        }
                    />
                ))}
                <div className="trade-header">ASKs</div>

                {product.asks.map((ask) => (
                    <TradeCard
                        userId={userId}
                        trade={ask}
                        productId={product.id}
                        productName={product.productName}
                        key={ask.id}
                        tradeType="ask"
                        actionEnabled={
                            ask.userId !== userId &&
                            !tradeRequestSent.includes(ask.id)
                        }
                    />
                ))}
            </div>
            <div className="buttons-container">
                <button
                    style={{ marginRight: "8px" }}
                    onClick={() => onNewTrade("bid")}
                >
                    Bid
                </button>
                <button onClick={() => onNewTrade("ask")}> Ask</button>
            </div>
        </>
    );
}
