import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import categoryReducer from "./categorySlice"
import productReducer from "./productSlice"
import wishlistReducer from "./wishlistSlice"
import cartReducer from "./cartSlice"

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: { warnAfter: 128 },
            serializableCheck: { warnAfter: 128 },
        }),
    reducer: {
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
    },
})

export default store
