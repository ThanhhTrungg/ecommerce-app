import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        listCart: [],
        openCartDrawer: false,
    },
    reducers: {
        getListCart: (state, action) => {
            state.listCart = action.payload
        },
        addToCart: (state, action) => {
            const itemInCart = state.listCart.find((item) => item.id === action.payload.id)
            if (itemInCart) {
                itemInCart.quantity++
            } else {
                state.listCart.push({ ...action.payload, quantity: 1 })
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.listCart.find((item) => item.id === action.payload)
            item.quantity++
        },
        decrementQuantity: (state, action) => {
            const item = state.listCart.find((item) => item.id === action.payload)
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--
            }
        },
        incrementByAmount: (state, action) => {
            const { modalDetail, quantity } = action.payload
            const itemInCart = state.listCart.find((item) => item.id === modalDetail.id)
            if (itemInCart) {
                itemInCart.quantity += quantity
            } else {
                state.listCart.push({ ...modalDetail, quantity: quantity })
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.listCart.filter((item) => item.id !== action.payload)
            state.listCart = removeItem
        },
        handleOpenDrawer: (state, action) => {
            state.openCartDrawer = action.payload
        },
    },
})

export const {
    getListCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    incrementByAmount,
    removeItem,
    handleOpenDrawer,
} = cartSlice.actions

export default cartSlice.reducer
