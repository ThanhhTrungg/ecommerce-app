import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { BagIcon } from "../Icons"
import priceFormat from "~/utils/priceFormat"
import * as cartActions from "~/redux/cartSlice"
import Products from "~/components/Products"
import Categories from "../Categories"
import * as categoryApi from "~/api/CategoryApi"
import * as productApi from "~/api/ProductApi"
import * as categoryActions from "~/redux/categorySlice"
import * as productActions from "~/redux/productSlice"

import classNames from "classnames/bind"
import styles from "./HomeContent.module.scss"
const cx = classNames.bind(styles)

const HomeContent = () => {
    const dispatch = useDispatch()
    const { listCategories } = useSelector((state) => state.category)
    const { listProducts } = useSelector((state) => state.product)
    const { listCart } = useSelector((state) => state.cart)

    useEffect(() => {
        try {
            const fetchApi = async () => {
                dispatch(productActions.setLoading(true))
                const response = await categoryApi.listCategory()
                dispatch(categoryActions.getAllCategories(response))
                dispatch(productActions.setLoading(false))
            }
            fetchApi()
        } catch (error) {
            console.log("Get all categories API is error: ", error.data)
        }
        try {
            const fetchApi = async () => {
                dispatch(productActions.setLoading(true))
                const response = await productApi.listProduct()
                dispatch(productActions.getAllProducts(response))
                dispatch(productActions.setLoading(false))
            }
            fetchApi()
        } catch (error) {
            console.log("Get all products API is error: ", error.data)
        }
    }, [dispatch])

    const getTotal = () => {
        let totalQuantity = 0,
            totalPrice = 0
        listCart.forEach((itemCart) => {
            totalQuantity += itemCart.quantity
            totalPrice += itemCart.price * itemCart.quantity
        })
        return { totalPrice, totalQuantity }
    }

    return (
        <div className={cx("home-content")}>
            <Categories
                categories={listCategories}
                title="Featured Categories"
                text="Choose your necessary products from this feature categories."
            />
            <Products
                products={listProducts}
                title="Popular Products for Daily Shopping"
                text="See all our popular products in this week. You can choose your daily needs products from this list and get some special offer with free shipping."
            />

            <div
                className={cx("cart-fixed")}
                onClick={() => {
                    dispatch(cartActions.handleOpenDrawer(true))
                }}>
                <div className={cx("cart-info")}>
                    <BagIcon className={cx("bag-icon")} />
                    <span className={cx("quantity")}>
                        {listCart && listCart.length > 0 ? `${listCart.length} items` : "0 item"}
                    </span>
                </div>
                <div className={cx("totalPrice")}>{priceFormat(getTotal().totalPrice)}</div>
            </div>
        </div>
    )
}

export default HomeContent
