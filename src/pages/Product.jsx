import React, { useState } from "react";
import "./Product.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useConfirmation } from "../hooks/useConfirmation";
import { addProduct, updateProduct } from "../service/productService";

const Product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currLocation = useLocation();
    const {
        message,
        isOpen,
        handleConfirm,
        handleCancel,
        requestConfirmation,
    } = useConfirmation();

    const product = currLocation.state;
    const isEditing = !!product;

    const [productContent, setProductContent] = useState(
        isEditing ? product.content : ""
    );

    const handleContentChange = (e) => setProductContent(e.target.value);

    const actionHandler = () => {
        if (productContent.trim() === "") return;
        requestConfirmation(
            isEditing
                ? "Are you sure you want to update this product?"
                : "Are you sure you want to add this product?",

            () => {
                isEditing
                    ? dispatch(
                          updateProduct({
                              content: productContent,
                              productId: product.id,
                          })
                      )
                    : dispatch(addProduct({ content: productContent })),
                    setProductContent("");
                navigate("/home");
            }
        );
    };

    const onCancel = () => {
        setProductContent("");
        navigate("/home");
    };

    return (
        <div className="product-form">
            <div className="post-form">
                <textarea
                    placeholder="Share with us..."
                    value={productContent}
                    onChange={handleContentChange}
                    className="content-textarea"
                    rows="4"
                />
                <div className="actions">
                    <button className="post-button" onClick={actionHandler}>
                        {isEditing ? "Update" : "Share"}
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
            {isOpen && (
                <ConfirmationDialog
                    message={message}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Product;
