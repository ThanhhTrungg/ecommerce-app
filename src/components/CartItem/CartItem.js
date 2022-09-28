import React from "react"
import priceFormat from "~/utils/priceFormat"
import Image from "~/components/Image"
import Button from "~/components/Button"
import { BagGreenIcon, MinusIcon, PlusIcon, TickBagIcon, TrashIcon, XMarkIcon } from "~/components/Icons"
import { useDispatch } from "react-redux"
import * as cartActions from "~/redux/cartSlice"
import * as productApi from "~/api/ProductApi"
import * as productActions from "~/redux/productSlice"

import toast from "react-hot-toast"
import classNames from "classnames/bind"
import styles from "./CartItem.module.scss"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(styles)

const CartItem = ({ listCart }) => {
    console.log("listCart", listCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            <ul className={cx("cartInfo")}>
                {listCart && listCart.length > 0 ? (
                    listCart.map((itemCart, index) => (
                        <li key={index}>
                            <div className={cx("itemBody")}>
                                <div className={cx("wrapImg")}>
                                    <Image src={itemCart.images} className={cx("itemImg")} />
                                </div>
                                <div className={cx("itemInfo")}>
                                    <h3
                                        className={cx("itemHead")}
                                        onClick={async () => {
                                            navigate(`/product`)
                                            const response = await productApi.getProduct(itemCart.id)

                                            console.log("response", response)
                                            dispatch(productActions.getProductDetail(response))
                                        }}>
                                        {itemCart.title}
                                    </h3>
                                    <span className={cx("itemPrice")}>Item price ${itemCart.price}</span>
                                    <div className={cx("itemActions")}>
                                        <span>{priceFormat(itemCart.price * itemCart.quantity)}</span>

                                        <div className={cx("quantityActions")}>
                                            <Button
                                                className={cx("btnMinus")}
                                                leftIcon={<MinusIcon />}
                                                onClick={() => dispatch(cartActions.decrementQuantity(itemCart.id))}
                                            />
                                            <span className={cx("spanQuantity")}>{itemCart.quantity}</span>
                                            <Button
                                                className={cx("btnPlus")}
                                                leftIcon={<PlusIcon />}
                                                onClick={() => dispatch(cartActions.incrementQuantity(itemCart.id))}
                                            />
                                        </div>

                                        <Button
                                            leftIcon={<TrashIcon />}
                                            onClick={() => handleDeleteItem(itemCart.id)}
                                            className={cx("deleteAction")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className={cx("cartEmpty")}>
                        <div>
                            <BagGreenIcon className={cx("cartEmptyIcon")} />
                        </div>
                        <h3>Your cart is empty</h3>
                        <p>No items added in your cart. Please add product to your cart list.</p>
                    </div>
                )}
            </ul>
            <div className={cx("cartFooter")}>
                <span>Proceed To Checkout</span>
                <span>{priceFormat(getTotal().totalPrice)}</span>
            </div>
        </>
    )
}

export default CartItem
