import React from "react";
import "./NewProduct.scss"; // Import the SCSS file
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../service/productService";

export default function NewProduct() {
    const [inputs, setInputs] = React.useState(getDefaultInputs());
    const [error, setError] = React.useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: enteredValue,
            };
        });
    };

    const onCreate = async () => {
        // [TODO] Implement this function
        if (!inputs.productName || !inputs.category || !inputs.description) {
            setError("All fields are required.");
            return;
        }
        await dispatch(addProduct(inputs));
        navigate("/home");
    };

    return (
        <div className="product-form-page">
            <div className="title">New product</div>
            <div className="label">Product Name</div>
            <input
                type="text"
                onChange={(e) =>
                    inputChangeHandler("productName", e.target.value)
                }
                value={inputs.productName}
                placeholder="Jack Daniel"
                className="input"
            />

            <div className="label">Category</div>
            <input
                type="text"
                onChange={(e) => inputChangeHandler("category", e.target.value)}
                value={inputs.category}
                placeholder="Liquor"
                className="input"
            />

            <div className="label">Description</div>
            <input
                type="text"
                onChange={(e) =>
                    inputChangeHandler("description", e.target.value)
                }
                value={inputs.description}
                placeholder="It is produced in Lynchburg, Tennessee, by the..."
                className="input"
            />
            <button className="create-button" onClick={onCreate}>
                Create
            </button>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

const getDefaultInputs = () => ({
    productName: "",
    category: "",
    description: "",
});
