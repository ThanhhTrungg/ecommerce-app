import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import classNames from "classnames/bind"
import styles from "./ProductModal.module.scss"
import { useDispatch, useSelector } from "react-redux"
import Button from "~/components/Button"
import * as cartApi from "~/api/CartApi"
import toast, { Toaster } from "react-hot-toast"
import * as productActions from "~/redux/productSlice"
import ecommerceService from "~/services/ecommerceService"
import Image from "~/components/Image"
import { Grid } from "@mui/material"
import { MinusIcon, PlusIcon } from "~/components/Icons"
import * as cartActions from "~/redux/cartSlice"
import * as productApi from "~/api/ProductApi"

const cx = classNames.bind(styles)

const ProductModal = ({ modalDetail, activeModal }) => {
    console.log("modalDetail", modalDetail)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { incrementQuantity, decrementQuantity } = useSelector((state) => state.cart)
    const { listProducts } = useSelector((state) => state.product)

    const handleCloseModal = (e) => {
        dispatch(productActions.getProductDetail(null))
    }
    const handleCloseDetailProduct = (e) => {
        e.stopPropagation()
    }

    const handleAddToCart = async () => {
        try {
            const response = await cartApi.addItemCart(modalDetail.id)
            toast.success(response.message, {
                duration: 3000,
                position: "bottom-right",
            })
            dispatch(ecommerceService.getListCart())
        } catch (error) {
            console.log(error)
            if (error.status === 500) {
                toast.error("error", {
                    position: "bottom-right",
                    duration: 3000,
                })
            } else {
                toast.error("This product has been added before", {
                    position: "bottom-right",
                    duration: 3000,
                })
            }
        }
    }

    return (
        <div className={cx("productDetail-modal", { activeModal })} onClick={handleCloseModal}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
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
                                    <Button className={cx("btn-minus")}>
                                        <MinusIcon />
                                    </Button>

                                    <span className={cx("span-quantity")}>0</span>

                                    <Button className={cx("btn-plus")}>
                                        <PlusIcon />
                                    </Button>
                                </Grid>
                                <Grid laptop={7} tablet={7} smTablet={9} mobile={9} smMobile={8} marginLeft="16px">
                                    <Button className={cx("action-addCart")} onClick={handleAddToCart}>
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
            <Toaster />
        </div>
    )
}

export default ProductModal
