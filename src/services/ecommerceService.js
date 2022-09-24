import * as categoryApi from "~/api/CategoryApi"
import * as productApi from "~/api/ProductApi"
import * as wishlistApi from "~/api/WishlistApi"
import * as cartApi from "~/api/CartApi"
import * as categoryActions from "~/redux/categorySlice"
import * as productActions from "~/redux/productSlice"
import * as wishlistActions from "~/redux/wishlistSlice"
import * as cartActions from "~/redux/cartSlice"

const getAllCategories = () => async (dispatch) => {
    try {
        const response = await categoryApi.listCategory()
        dispatch(categoryActions.getAllCategories(response))
    } catch (error) {
        console.log("Get all categories API is error: ", error.data)
    }
}

const getAllProducts = () => async (dispatch) => {
    try {
        const response = await productApi.listProduct()
        dispatch(productActions.getAllProducts(response))
    } catch (error) {
        console.log("Get all products API is error: ", error.data)
    }
}

const getListWishlist = () => async (dispatch) => {
    try {
        const response = await wishlistApi.getListWishlist()
        dispatch(wishlistActions.getListWishlist(response))
    } catch (error) {
        console.log("Get all items wishlist API is error: ", error.data)
    }
}

const getListCart = () => async (dispatch) => {
    try {
        const response = await cartApi.getListCart()
        dispatch(cartActions.getListCart(response))
    } catch (error) {
        console.log("Get all items cart API is error: ", error.data)
    }
}

const ecommerceService = { getAllCategories, getAllProducts, getListWishlist, getListCart }
export default ecommerceService
