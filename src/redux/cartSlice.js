import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        listCart: {},
        openCartDrawer: false,
        cartItemQuantity: 1,
    },
    reducers: {
        getListCart: (state, action) => {
            state.listCart = action.payload
        },
        setCartItemQuantity: (state, action) => {
            state.cartItemQuantity = action.payload
        }, // actions types : cart/setCartItemQuantity
        handleOpenDrawer: (state, action) => {
            state.openCartDrawer = action.payload
        },
    },
})

export const { getListCart, setCartItemQuantity, handleOpenDrawer } = cartSlice.actions

export default cartSlice.reducer
