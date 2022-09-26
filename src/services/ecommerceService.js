
import * as wishlistApi from "~/api/WishlistApi"
import * as cartApi from "~/api/CartApi"
import * as wishlistActions from "~/redux/wishlistSlice"
import * as cartActions from "~/redux/cartSlice"
import { useState } from "react"

const getAllCategories = () => async (dispatch) => {
   
}

const getAllProducts = () => async (dispatch) => {}

// const getListWishlist = () => async (dispatch) => {
//     try {
//         const response = await wishlistApi.getListWishlist()
//         dispatch(wishlistActions.getListWishlist(response))
//     } catch (error) {
//         console.log("Get all items wishlist API is error: ", error.data)
//     }
// }

// const getListCart = () => async (dispatch) => {
//     try {
//         const response = await cartApi.getListCart()
//         dispatch(cartActions.getListCart(response))
//     } catch (error) {
//         console.log("Get all items cart API is error: ", error.data)
//     }
// }

const ecommerceService = { getAllCategories, getAllProducts }
export default ecommerceService
