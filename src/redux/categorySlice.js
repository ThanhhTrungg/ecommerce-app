import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        listCategories: [],
        products: [],
    },
    reducers: {
        setAllCategories: (state, action) => {
            state.listCategories = action.payload
        }, // actions types : category/getAllCategories
        getProductsByCategory: (state, action) => {
            state.products = action.payload
        }, // actions types : category/getAllCategories
    },
})

export const { setAllCategories, getProductsByCategory } = categorySlice.actions

export default categorySlice.reducer
