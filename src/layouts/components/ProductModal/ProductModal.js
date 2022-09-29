import React, { useState } from "react"
import { Link } from "react-router-dom"

import classNames from "classnames/bind"
import styles from "./ProductModal.module.scss"
import { useDispatch } from "react-redux"
import Button from "~/components/Button"
import toast from "react-hot-toast"
import * as productActions from "~/redux/productSlice"
import Image from "~/components/Image"
import { Grid } from "@mui/material"
import { MinusIcon, PlusIcon } from "~/components/Icons"
import * as cartActions from "~/redux/cartSlice"

const cx = classNames.bind(styles)

const ProductModal = ({ modalDetail, activeModal }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    const handleCloseModal = (e) => {
        dispatch(productActions.getProductDetail(null))
        setQuantity(1)
    }
    const handleCloseDetailProduct = (e) => {
        e.stopPropagation()
    }

    const handleAddToCart = (modalDetail, quantity) => {
        dispatch(cartActions.incrementByAmount({ modalDetail, quantity }))
        toast.success("Product has been added to cart", {
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
                {modalDetail && (
                    <>
                        <Grid className={cx("detail-img")}>
                            <Image className={cx("img-product")} src={modalDetail.images} alt={modalDetail.title} />
                        </Grid>

                        <Grid className={cx("detail-content")}>
                            <div className={cx("detail-header")}>
                                <h1 className={cx("content-head")}>{modalDetail.title}</h1>
                                <span className={cx("content-sku")}>SKU: {modalDetail.code}</span>
                            </div>
                            <p className={cx("content-des")}>{modalDetail.description}</p>
                            <span className={cx("content-price")}>{"$" + modalDetail.price}</span>

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
                                        onClick={() => handleAddToCart(modalDetail, quantity)}>
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
                                        <span>Category: </span> {modalDetail.title}
                                    </span>
                                    <span className={cx("smBelong-category")}>{modalDetail.title}</span>
                                </Grid>
                                <Grid className={cx("more-info")}>
                                    <Link to={"/product"}>More info</Link>
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
