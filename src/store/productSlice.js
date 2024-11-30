import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";
import {
    addProduct,
    deleteProduct,
    updateProduct,
} from "../service/productService";
import { addTrade, deleteTrade, updateTrade } from "../service/tradeService";

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [
            {
                id: "1",
                productName: "Jack Daniel",
                category: "Liquor",
                description: "A premium whiskey with a rich history.",
                bids: [
                    {
                        id: "1",
                        price: "3000",
                        quantity: "200 bottles",
                        userId: "1",
                        username: "John Doe",
                        address: {
                            street: "123 Whiskey Lane",
                            city: "Lynchburg",
                            state: "TN",
                            zip: "37352",
                        },
                        createdAt: "2021-07-01T12:00:00",
                    },
                ],
                asks: [
                    {
                        id: "2",
                        price: "3500",
                        quantity: "100 bottles",
                        userId: "2",
                        username: "Jane Doe",
                        address: {
                            street: "456 Whiskey Lane",
                            city: "Lynchburg",
                            state: "TN",
                            zip: "37352",
                        },
                        createdAt: "2021-07-01T12:00:00",
                    },
                ],
            },
            {
                id: "2",
                productName: "Johnnie Walker",
                description: "A well-known brand of Scotch whisky.",
                category: "Liquor",
                bids: [
                    {
                        id: "3",
                        price: "4000",
                        quantity: "100 bottles",
                        userId: "3",
                        username: "John Smith",
                        address: {
                            street: "123 Scotch Road",
                            city: "Kilmarnock",
                            state: "Scotland",
                            zip: "KA1 1AA",
                        },
                        createdAt: "2021-07-01T12:00:00",
                    },
                ],
                asks: [
                    {
                        id: "4",
                        price: "4500",
                        quantity: "50 bottles",
                        userId: "4",
                        username: "Jane Smith",
                        address: {
                            street: "456 Scotch Road",
                            city: "Kilmarnock",
                            state: "Scotland",
                            zip: "KA1 1AA",
                        },
                        createdAt: "2021-07-01T12:00:00",
                    },
                ],
            },
        ],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        [loginUser, registerUser, fetchUser].forEach((apiCall) => {
            builder.addCase(apiCall.fulfilled, (state, action) => {
                state.productList = action.payload.productList;
            });
        });
        builder
            // Add product
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.productList.push(action.payload);
                state.loading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const productId = action.meta.arg.productId;
                state.productList = state.productList.filter(
                    (product) => product.id !== productId
                );
                state.loading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { productId, content } = action.meta.arg;
                state.productList = state.productList.map((product) =>
                    product.id === productId ? { ...product, content } : product
                );
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // add trade
            .addCase(addTrade.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTrade.fulfilled, (state, action) => {
                const { productId } = action.meta.arg;
                state.productList = state.productList.map((p) =>
                    p.id === productId ? action.payload : p
                );
                state.loading = false;
            })
            .addCase(addTrade.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // update trade
            .addCase(updateTrade.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTrade.fulfilled, (state, action) => {
                const { productId } = action.meta.arg;
                state.productList = state.productList.map((p) =>
                    p.id === productId ? action.payload : p
                );
                state.loading = false;
            })
            .addCase(updateTrade.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete trade
            .addCase(deleteTrade.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTrade.fulfilled, (state, action) => {
                const { productId } = action.meta.arg;
                state.productList = state.productList.map((p) =>
                    p.id === productId ? action.payload : p
                );
                state.loading = false;
            })
            .addCase(deleteTrade.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { productAdded, startEditingProduct, cancelEditingProduct } =
    productSlice.actions;

export default productSlice.reducer;
