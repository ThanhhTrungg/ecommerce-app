import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductModal from "../ProductModal"
import ecommerceService from "~/services/ecommerceService"
import ListItem from "~/components/ListItem"

import classNames from "classnames/bind"
import styles from "./HomeContent.module.scss"
import { BagIcon } from "../Icons"
import priceFormat from "~/utils/priceFormat"
import * as cartActions from "~/redux/cartSlice"
const cx = classNames.bind(styles)

const HomeContent = () => {
    const dispatch = useDispatch()
    const { listCategories } = useSelector((state) => state.category)
    const { listProducts, productDetail } = useSelector((state) => state.product)
    const { listCart } = useSelector((state) => state.cart)
    useEffect(() => {
        dispatch(ecommerceService.getAllCategories())
        dispatch(ecommerceService.getAllProducts())
        // dispatch(ecommerceService.getListCart())
        // dispatch(ecommerceService.getListWishlist())
    }, [dispatch])

    return (
        <div className={cx("home-content")}>
            <ListItem
                items={listCategories}
                title="Featured Categories"
                text="Choose your necessary products from this feature categories."
            />

            <ListItem
                items={listProducts}
                title="Popular Products for Daily Shopping"
                text="See all our popular products in this week. You can choose your daily needs products from this list and get some special offer with free shipping."
                isProduct
            />
            <ProductModal modalDetail={productDetail} activeModal={productDetail} />

            <div
                className={cx("cart-fixed")}
                onClick={() => {
                    dispatch(ecommerceService.getListCart())
                    dispatch(cartActions.handleOpenDrawer(true))
                }}>
                <div className={cx("cart-info")}>
                    <BagIcon className={cx("bag-icon")} />
                    <span className={cx("quantity")}>
                        {listCart.cartItems && listCart.cartItems.length > 0
                            ? `${listCart.cartItems.length} items`
                            : "0 item"}
                    </span>
                </div>
                <div className={cx("totalPrice")}>
                    {listCart.totalCost ? priceFormat(listCart.totalCost) : priceFormat(0)}
                </div>
            </div>
        </div>
    )
}

export default HomeContent
