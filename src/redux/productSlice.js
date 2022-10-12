import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        listProducts: [],
        productDetail: {},
        product: {},
        openProductModal: false,
        sortPrice: "",
        loading: false,
    },
    reducers: {
        setAllProducts: (state, action) => {
            state.listProducts = action.payload
        }, // actions types : product/setAllProducts
        setProductDetail: (state, action) => {
            state.productDetail = action.payload
        }, // actions types : product/setProductModal
        setOpenProductModal: (state, action) => {
            state.openProductModal = action.payload
        }, // actions types : product/setOpenProductModal
        setProduct: (state, action) => {
            state.product = action.payload
        }, // actions types : product/setProduct
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
        }, // actions types : product/sortPrice
        setLoading: (state, action) => {
            state.loading = action.payload
        }, // actions types : product/setLoading
    },
})

export const { setAllProducts, setProductDetail, setOpenProductModal, setProduct, sortPrice, setLoading } =
    productSlice.actions

export default productSlice.reducer
