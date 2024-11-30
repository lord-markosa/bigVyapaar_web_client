import React from "react";
import { useSelector } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import Spinner from "../components/Spinner";

import "./ProductList.scss";
import { selectProductList } from "../selectors/productSelectors";

const ProductList = ({ requestConfirmation }) => {
    const { loading, productList } = useSelector(selectProductList);

    return (
        <>
            {productList.map((product) => (
                <ProductListItem
                    key={product.id}
                    product={product}
                    requestConfirmation={requestConfirmation}
                />
            ))}
            {loading && <Spinner small={true} />}
        </>
    );
};

export default ProductList;
