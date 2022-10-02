import React, { useEffect, useRef, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

import classNames from "classnames/bind"
import styles from "./ProductModal.module.scss"
import { useDispatch } from "react-redux"
import Button from "~/components/Button"
import toast from "react-hot-toast"
import * as productActions from "~/redux/productSlice"
import * as productApi from "~/api/ProductApi"
import Image from "~/components/Image"
import { Grid } from "@mui/material"
import { MinusIcon, PlusIcon } from "~/components/Icons"
import * as cartActions from "~/redux/cartSlice"

const cx = classNames.bind(styles)

const ProductModal = ({ product, activeModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)

    const handleCloseModal = () => {
        dispatch(productActions.setProductDetail(undefined))
        setQuantity(1)
    }
    const handleCloseDetailProduct = (e) => {
        e.stopPropagation()
    }

    const handleAddToCart = (product, quantity) => {
        dispatch(cartActions.incrementByAmount({ product, quantity }))
        toast.success(`${quantity} ${product.title} added to cart`, {
            duration: 3000,
            position: "bottom-left",
        })
    }

    return (
        <div className={cx("productDetail-modal", { activeModal })} onClick={handleCloseModal}>
            <Grid
                container
                justifyContent="center"
                className={cx("detail-container")}
                onClick={handleCloseDetailProduct}>
                {product && (
                    <>
                        <Grid className={cx("detail-img")}>
                            <Image className={cx("img-product")} src={product.images} alt={product.title} />
                        </Grid>

                        <Grid className={cx("detail-content")}>
                            <div className={cx("detail-header")}>
                                <h1 className={cx("content-head")}>{product.title}</h1>
                                <span className={cx("content-sku")}>SKU: {product.code}</span>
                            </div>
                            <p className={cx("content-des")}>{product.description}</p>
                            <span className={cx("content-price")}>{"$" + product.price}</span>

                            <Grid display="flex" className={cx("qty-cate")}>
                                <Grid
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    laptop={5}
                                    tablet={5}
                                    smTablet={3}
                                    mobile={3}
                                    smMobile={4}
                                    className={cx("quantity-actions")}>
                                    <Button
                                        className={cx("btn-minus")}
                                        onClick={() => setQuantity(quantity - 1 > 1 ? quantity - 1 : 1)}>
                                        <MinusIcon />
                                    </Button>

                                    <span className={cx("span-quantity")}>{quantity}</span>

                                    <Button className={cx("btn-plus")} onClick={() => setQuantity(quantity + 1)}>
                                        <PlusIcon />
                                    </Button>
                                </Grid>
                                <Grid laptop={7} tablet={7} smTablet={9} mobile={9} smMobile={8} marginLeft="16px">
                                    <Button
                                        className={cx("action-addCart")}
                                        onClick={() => handleAddToCart(product, quantity)}>
                                        Add to Cart
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                className={cx("footer-modal")}>
                                <Grid display="flex" flexDirection="column">
                                    <span className={cx("belong-category")}>
                                        <span>Category: </span> {product.title}
                                    </span>
                                    <span className={cx("smBelong-category")}>{product.title}</span>
                                </Grid>
                                <Grid className={cx("more-info")}>
                                    <Link to={`#`} onClick={handleCloseModal}>
                                        More info
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    )
}

export default ProductModal
