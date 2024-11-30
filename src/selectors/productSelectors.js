import { createSelector } from "@reduxjs/toolkit";

export const selectProductList = createSelector(
    (state) => state.product,
    (product) => ({
        loading: product.loading,
        productList: product.productList,
    })
);
