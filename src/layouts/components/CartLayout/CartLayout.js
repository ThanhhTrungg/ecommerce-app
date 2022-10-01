import React from "react"
import priceFormat from "~/utils/priceFormat"
import Button from "~/components/Button"
import { TickBagIcon, XMarkIcon } from "~/components/Icons"
import { useDispatch, useSelector } from "react-redux"
import { BagGreenIcon } from "~/components/Icons"
import * as cartActions from "~/redux/cartSlice"
import * as userActions from "~/redux/userSlice"
import CartItem from "~/components/CartItem"

import classNames from "classnames/bind"
import styles from "./CartLayout.module.scss"
import { useNavigate } from "react-router-dom"
import { auth } from "~/firebase"

const cx = classNames.bind(styles)

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { listCart } = useSelector((state) => state.cart)

    const getTotal = () => {
        let totalQuantity = 0
        let totalPrice = 0
        listCart.forEach((itemCart) => {
            totalQuantity += itemCart.quantity
            totalPrice += itemCart.price * itemCart.quantity
        })
        return { totalPrice, totalQuantity }
    }

    return (
        <>
            <div className={cx("cartHead")}>
                <div className={cx("cartTitle")}>
                    <TickBagIcon className={cx("cartTitleIcon")} />
                    <h2 className={cx("cartText")}>Shopping Cart</h2>
                </div>
                <Button
                    className={cx("cartClose")}
                    leftIcon={<XMarkIcon className={cx("closeIcon")} />}
                    onClick={() => dispatch(cartActions.handleOpenDrawer(false))}>
                    Close
                </Button>
            </div>
            {listCart && listCart.length > 0 ? (
                <CartItem listCart={listCart} />
            ) : (
                <div className={cx("cartEmpty")}>
                    <div>
                        <BagGreenIcon className={cx("cartEmptyIcon")} />
                    </div>
                    <h3>Your cart is empty</h3>
                    <p>No items added in your cart. Please add product to your cart list.</p>
                </div>
            )}
            <div
                className={cx("cartFooter")}
                onClick={() => {
                    const user = auth.currentUser
                    console.log("user", user)
                    if (listCart.length === 0 && user) {
                        dispatch(cartActions.handleOpenDrawer(false))
                    } else if (listCart.length > 0 && user) {
                        dispatch(cartActions.handleOpenDrawer(false))
                        navigate("/checkout")
                    } else if (listCart.length > 0 && !user) {
                        dispatch(cartActions.handleOpenDrawer(false))
                        dispatch(userActions.setOpenLoginModal(true))
                        // logic after login redirect check out page
                        //...
                    }
                    dispatch(cartActions.handleOpenDrawer(false))
                }}>
                <span>Proceed To Checkout</span>
                <span>{priceFormat(getTotal().totalPrice)}</span>
            </div>
        </>
    )
}

export default Cart
