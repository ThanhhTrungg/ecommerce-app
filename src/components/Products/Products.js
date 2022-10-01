import React from "react"
import { useDispatch } from "react-redux"

import * as productActions from "~/redux/productSlice"
import * as cartActions from "~/redux/cartSlice"

import toast from "react-hot-toast"
import Image from "../Image"
import { CartPlusIcon } from "../Icons"

import classNames from "classnames/bind"
import styles from "./Products.module.scss"

const cx = classNames.bind(styles)

const Products = ({ product, className }) => {
    const dispatch = useDispatch()

    return (
        <div className={cx("list-products", { [className]: className })}>
            <div
                className={cx("list-imgProduct")}
                onClick={() => {
                    dispatch(productActions.getProductDetail(product))
                }}>
                <Image src={product.images} alt={product.title} className={cx("product-img")} />
            </div>
            <div className={cx("list-infoProduct")}>
                <p className={cx("list-skuProduct")}>{product.code}</p>
                <p className={cx("list-nameProduct")}>{product.title}</p>

                <div className={cx("product-actions")}>
                    <span className={cx("list-priceProduct")}>{"$" + product.price}</span>
                    <button
                        className={cx("action-btn")}
                        onClick={() => {
                            dispatch(cartActions.addToCart(product))
                            toast.success(`1 ${product.title} added to cart`, {
                                duration: 3000,
                                position: "bottom-left",
                            })
                        }}>
                        <CartPlusIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Products
