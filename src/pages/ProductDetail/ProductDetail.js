import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowHorizonIcon, MinusIcon, PlusIcon } from "~/components/Icons"

import classNames from "classnames/bind"
import styles from "./ProductDetail.module.scss"
import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import Image from "~/components/Image"
import Button from "~/components/Button"
const cx = classNames.bind(styles)

const ProductDetail = () => {
    const { productDetail } = useSelector((state) => state.product)

    useEffect(() => {}, [])
    return (
        <div>
            <div className={cx("bread-crumbs")}>
                <Link className={cx("home")} to="/">
                    Home
                </Link>
                <ArrowHorizonIcon />
                <Link className={cx("category")} to="/">
                    Home
                </Link>
                <ArrowHorizonIcon />
                <p className={cx("product-name")}>{productDetail.title}</p>
            </div>

            <Grid container justifyContent="center" alignItems="center" className={cx("detail-container")}>
                <Grid className={cx("detail-img")}>
                    <Image className={cx("img-product")} src={productDetail.images} alt={productDetail.title} />
                </Grid>
                <Grid className={cx("detail-content")}>
                    <div className={cx("detail-header")}>
                        <h1 className={cx("content-head")}>{productDetail.title}</h1>
                        <span className={cx("content-sku")}>SKU: {productDetail.code}</span>
                    </div>
                    <p className={cx("content-des")}>{productDetail.description}</p>
                    <span className={cx("content-price")}>{"$" + productDetail.price}</span>

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
                                // onClick={() =>
                                //     dispatch(
                                //         cartActions.setCartItemQuantity(
                                //             cartItemQuantity - 1 === 0 ? 1 : cartItemQuantity - 1
                                //         )
                                //     )
                                // }
                            >
                                <MinusIcon />
                            </Button>

                            <span className={cx("span-quantity")}>{/* {cartItemQuantity} */}0</span>

                            <Button
                                className={cx("btn-plus")}
                                // onClick={() => dispatch(cartActions.setCartItemQuantity(cartItemQuantity + 1))}
                            >
                                <PlusIcon />
                            </Button>
                        </Grid>
                        <Grid laptop={7} tablet={7} smTablet={9} mobile={9} smMobile={8} marginLeft="16px">
                            <Button
                                className={cx("action-addCart")}
                                // onClick={handleAddToCart}
                            >
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
                                <span>Category: </span> {productDetail.title}
                            </span>
                            <span className={cx("smBelong-category")}>{productDetail.title}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductDetail
