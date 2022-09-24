import { createSlice } from "@reduxjs/toolkit"

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        listWishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    },
    reducers: {
        getListWishlist: (state, action) => {
            state.listWishlist = action.payload
        }, // actions types : wishlist/getListWishlist
    },
})

export const { getListWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
