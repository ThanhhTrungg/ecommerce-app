import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        listCategories: [],
        category: {},
    },
    reducers: {
        getAllCategories: (state, action) => {
            state.listCategories = action.payload
        }, // actions types : category/getAllCategories
        getCategory: (state, action) => {
            state.category = action.payload
        }, // actions types : category/getAllCategories
    },
})

export const { getAllCategories, getCategory } = categorySlice.actions

export default categorySlice.reducer
