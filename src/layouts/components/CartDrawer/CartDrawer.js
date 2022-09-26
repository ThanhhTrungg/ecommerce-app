import { Divider, Drawer, List, ListItem } from "@mui/material"
import React from "react"
import priceFormat from "~/utils/priceFormat"
import Image from "~/components/Image"
import Button from "~/components/Button"
import { BagIcon, MinusIcon, PlusIcon, TickBagIcon, TrashIcon, XMarkIcon } from "~/components/Icons"
import cartSlice from "~/redux/cartSlice"
import { deleteItemCart } from "~/api/CartApi"
import { useDispatch, useSelector } from "react-redux"
import * as cartActions from "~/redux/cartSlice"

import classNames from "classnames/bind"
import styles from "./CartDrawer.module.scss"
import { styled } from "@mui/system"
import toast from "react-hot-toast"
const cx = classNames.bind(styles)

const CardHead = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#eef2ff",
    height: "70px",
    padding: "16px 20px",
})

const CartDrawer = ({ isOpen, handleClose, items }) => {
    const dispatch = useDispatch()
    const { listCart } = useSelector((state) => state.cart)
    console.log("listCart", listCart)

    const handleDeleteItem = (id) => {
        try {
            dispatch(cartActions.removeItem(id))
            toast.success("Product has been remove from cart", {
                duration: 3000,
                position: "bottom-left",
            })
        } catch (error) {
            console.error("Get all items cart API is error: ", error)
        }
    }

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
        <Drawer
            PaperProps={{ sx: { width: "420px", display: "flex", justifyContent: "space-between" } }}
            className={cx("cart-drawer")}
            open={isOpen}
            onClose={handleClose}
            anchor={"right"}
            transitionDuration={350}>
            <CardHead className={cx("cart-head")}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TickBagIcon />
                    <h2 style={{ marginLeft: "8px", fontSize: "1.8rem" }}>Shopping Cart</h2>
                </div>
                <Button leftIcon={<XMarkIcon />} onClick={handleClose}>
                    Close
                </Button>
            </CardHead>
            <ul disablePadding className={cx("cart-info")} style={{ textAlign: "center" }}>
                {listCart && listCart.length > 0 ? (
                    listCart.map((itemCart, index) => (
                        <>
                            <li key={index} disablePadding className={cx("item-body")}>
                                <div>
                                    <Image src={itemCart.images} className={cx("item-img")} />
                                </div>
                                <div className={cx("item-info")}>
                                    <h3 className={cx("item-head")}>{itemCart.name}</h3>
                                    <span className={cx("item-price")}>Item price {priceFormat(itemCart.price)}</span>
                                    <div>
                                        <span>{priceFormat(itemCart.price * itemCart.quantity)}</span>

                                        <div>
                                            <Button
                                                className={cx("btn-minus")}
                                                leftIcon={<MinusIcon />}
                                                onClick={() => dispatch(cartActions.decrementQuantity(itemCart.id))}
                                            />
                                            <span className={cx("span-quantity")}>{itemCart.quantity}</span>
                                            <Button
                                                className={cx("btn-plus")}
                                                leftIcon={<PlusIcon />}
                                                onClick={() => dispatch(cartActions.incrementQuantity(itemCart.id))}
                                            />
                                        </div>

                                        <Button
                                            leftIcon={<TrashIcon />}
                                            onClick={() => handleDeleteItem(itemCart.id)}
                                        />
                                    </div>
                                </div>
                            </li>
                            <Divider />
                        </>
                    ))
                ) : (
                    <div className={cx("cart-empty")}>
                        <BagIcon />
                        <h3>Your cart is empty</h3>
                        <p>No items added in your cart. Please add product to your cart list.</p>
                    </div>
                )}
            </ul>
            <div className={cx("cart-footer")}>
                <span>Proceed To Checkout</span>
                <span>{priceFormat(getTotal().totalPrice)}</span>
            </div>
        </Drawer>
    )
}

export default CartDrawer
