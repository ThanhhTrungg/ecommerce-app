import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        listProducts: [],
        productDetail: null,
        sortPrice: "",
    },
    reducers: {
        getAllProducts: (state, action) => {
            state.listProducts = action.payload
        }, // actions types : product/getAllProducts
        setProductDetail: (state, action) => {
            state.productDetail = action.payload
        }, // actions types : product/setProductDetail
        sortPrice: (state, action) => {
            const { product } = action.payload
            if (state.sortPrice !== "") {
                product !== undefined &&
                    product
                        .slice()
                        .sort((a, b) =>
                            state.sortPrice === "lowest"
                                ? a.productPrice > b.productPrice
                                    ? 1
                                    : -1
                                : a.productPrice
                                ? 1
                                : -1
                        )
            } else {
                product !== undefined && product.slice().sort((a, b) => (a.id > b.id ? 1 : -1))
            }
        }, // actions types : product/setProductDetail
    },
})

export const { getAllProducts, setProductDetail, sortPrice } = productSlice.actions

export default productSlice.reducer
