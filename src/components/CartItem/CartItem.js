import React from "react"
import priceFormat from "~/utils/priceFormat"
import Image from "~/components/Image"
import Button from "~/components/Button"
import { MinusIcon, PlusIcon, TrashIcon } from "~/components/Icons"
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

    const handleDeleteItem = (title, id) => {
        try {
            dispatch(cartActions.removeItem(id))
            toast.success(`${title} has been removed from the cart`, {
                duration: 3000,
                position: "bottom-left",
            })
        } catch (error) {
            console.error("Something went wrong: ", error.message)
        }
    }

    return (
        <ul className={cx("cartInfo")}>
            {listCart.map((itemCart, index) => (
                <li key={index} className={cx("itemBody")}>
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
                                onClick={() => handleDeleteItem(itemCart.title, itemCart.id)}
                                className={cx("deleteAction")}
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CartItem
