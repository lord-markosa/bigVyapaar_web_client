import React from "react";
import AddressForm from "../components/AddressForm";
import { useDispatch } from "react-redux";
import { addTrade, updateTrade } from "../service/tradeService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./TradeForm.scss";

export default function TradeForm() {
    const [inputs, setInputs] = React.useState({
        quantity: "",
        price: "",
    });
    const [address, setAddress] = React.useState({
        city: "",
        state: "",
        zip: "",
    });

    const location = useLocation();

    const trade = location.state;

    React.useEffect(() => {
        if (trade) {
            setInputs({
                quantity: trade.quantity,
                price: trade.price,
            });
        }
    }, []);

    const params = useParams();
    const navigate = useNavigate();
    const productId = params.productId;
    const tradeType = params.tradeType;

    const dispatch = useDispatch();

    const inputChangeHandler = (e) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [e.target.name]: e.target.value,
            };
        });
    };

    const onSubmit = () => {
        // [TODO] Implement this function

        if (trade) {
            dispatch(
                updateTrade({
                    trade: { ...trade, ...inputs, address },
                    productId,
                    tradeType,
                })
            );
        } else {
            dispatch(
                addTrade({
                    trade: { ...inputs, address },
                    productId,
                    tradeType,
                })
            );
        }

        navigate(-1);
    };

    return (
        <div className="trade-form-page">
            <div className="title">{tradeType === "bid" ? "BID" : "ASK"}</div>
            <label>Price</label>
            <input
                type="text"
                name="price"
                onChange={inputChangeHandler}
                value={inputs.price}
                placeholder="2990 per bottle"
                className="input"
            />
            <label className="label">Quantity</label>
            <input
                type="text"
                name="quantity"
                onChange={inputChangeHandler}
                value={inputs.quantity}
                placeholder="200 bottles"
                className="input"
            />
            <AddressForm address={address} setAddress={setAddress} />
            <button onClick={onSubmit} className="submit-button">
                Submit
            </button>
        </div>
    );
}
