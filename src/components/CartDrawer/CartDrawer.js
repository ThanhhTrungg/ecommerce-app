import { Divider, Drawer, List, ListItem } from "@mui/material"
import React from "react"
import priceFormat from "~/utils/priceFormat"
import Image from "../Image"
import Button from "../Button"
import { BagIcon, MinusIcon, PlusIcon, TickBagIcon, TrashIcon, XMarkIcon } from "../Icons"
import * as cartActions from "~/redux/cartSlice"
import { deleteItemCart } from "~/api/CartApi"
import { useDispatch, useSelector } from "react-redux"
import ecommerceService from "~/services/ecommerceService"

import classNames from "classnames/bind"
import styles from "./CartDrawer.module.scss"
import { styled } from "@mui/system"
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
    const { cartItemQuantity, listCart } = useSelector((state) => state.cart)
    console.log("listCart", listCart)

    const handleDeleteItem = async (id) => {
        try {
            const response = await deleteItemCart(id)
            dispatch(ecommerceService.getListCart())
        } catch (error) {
            console.log("Get all items cart API is error: ", error)
        }
    }
    return (
        <Drawer
            PaperProps={{ sx: { width: "420px", display: "flex", justifyContent: "space-between" } }}
            className={cx("cart-drawer")}
            open={isOpen}
            onClose={handleClose}
            anchor={"right"}
            transitionDuration={350}>
            <CardHead>
                <div>
                    <TickBagIcon />
                    <h2>Shopping Cart</h2>
                </div>
                <Button leftIcon={<XMarkIcon />} onClick={handleClose}>
                    Close
                </Button>
            </CardHead>
            <List disablePadding>
                {items.cartItems && items.cartItems.length > 0 ? (
                    items.cartItems.map((element, index) => (
                        <>
                            <ListItem key={index} disablePadding className={cx("body-item")}>
                                <Image src={element.product.productImageUrl} className={cx("item-img")} />
                                <div className={cx("item-info")}>
                                    <h3 className={cx("item-head")}>{element.product.productName}</h3>
                                    <span className={cx("item-price")}>
                                        Item price {priceFormat(element.product.productPrice)}
                                    </span>
                                    <div>
                                        <span>{priceFormat(element.product.productPrice * element.quantity)}</span>

                                        <div>
                                            <Button
                                                className={cx("btn-minus")}
                                                leftIcon={<MinusIcon />}
                                                onClick={() => {}}
                                            />
                                            <span className={cx("span-quantity")}>{cartItemQuantity}</span>
                                            <Button
                                                className={cx("btn-plus")}
                                                leftIcon={<PlusIcon />}
                                                onClick={() => {}}
                                            />
                                        </div>

                                        <Button
                                            leftIcon={<TrashIcon />}
                                            onClick={() => handleDeleteItem(element.product.id)}
                                        />
                                    </div>
                                </div>
                            </ListItem>
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
            </List>
            <div className={cx("cart-footer")}>
                <span>Proceed To Checkout</span>
                <span>{items.totalCost ? priceFormat(items.totalCost) : priceFormat(0)}</span>
            </div>
        </Drawer>
    )
}

export default CartDrawer
