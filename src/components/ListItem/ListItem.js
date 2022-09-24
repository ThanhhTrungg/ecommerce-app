import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Scrollbar } from "swiper"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"
import "swiper/scss/scrollbar"
import { useNavigate } from "react-router-dom"
import * as wishlistApi from "~/api/WishlistApi"
import * as cartApi from "~/api/CartApi"
import * as categoryApi from "~/api/CategoryApi"
import * as productActions from "~/redux/productSlice"
import * as cartActions from "~/redux/cartSlice"
import * as categoryActions from "~/redux/categorySlice"

import toast, { Toaster } from "react-hot-toast"
import ecommerceService from "~/services/ecommerceService"
import { Grid } from "@mui/material"
import Image from "../Image"
import { CartPlusIcon, HeartPlusIcon } from "../Icons"

import classNames from "classnames/bind"
import styles from "./ListItem.module.scss"

const cx = classNames.bind(styles)

const ListItem = ({ items, title, isProduct, text }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { listWishlist } = useSelector((state) => state.wishlist)
    let { cartItemQuantity } = useSelector((state) => state.cart)

    // open modal product detail
    const handleOpenModal = (item) => {
        dispatch(productActions.setProductDetail(item))
        dispatch(cartActions.setCartItemQuantity(1))
    }

    const handleDeleteWishlist = async (itemId) => {
        try {
            const response = await wishlistApi.deleteItemWishlist(itemId)
            toast.success(response.message, {
                duration: 3000,
                position: "bottom-right",
            })

            dispatch(ecommerceService.getListWishlist())
        } catch (error) {
            error.status === 500
                ? toast.error("error", {
                      position: "bottom-right",
                      duration: 3000,
                  })
                : toast.error(error.data, {
                      position: "bottom-right",
                      duration: 3000,
                  })
        }
    }

    const handleAddWishlist = async (item) => {
        try {
            const response = await wishlistApi.addItemWishlist(item.id)
            dispatch(ecommerceService.getListWishlist())
            toast.success(response.message, {
                duration: 3000,
                position: "bottom-right",
            })

            localStorage.setItem("wishlist", JSON.stringify(listWishlist))
        } catch (error) {
            error.status === 500
                ? toast.error("error", {
                      position: "bottom-right",
                      duration: 3000,
                  })
                : toast.error("Please login to add to wishlist", {
                      position: "bottom-right",
                      duration: 3000,
                  })
        }
    }

    const handleAddCart = async (item) => {
        try {
            const response = await cartApi.addItemCart(item.id, cartItemQuantity)
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
                toast.error("Please login to add to cart", {
                    position: "bottom-right",
                    duration: 3000,
                })
            }
        }
    }

    return (
        <div className={cx("list-contents")}>
            <div className={cx("contents-header")}>
                <h2 className={cx("list-header")}>{title}</h2>
                <p className={cx("list-text")}> {text}</p>
            </div>
            <Grid container>
                    {items &&
                        items.length > 0 &&
                        items.map((item, idx) =>
                            isProduct ? (
                                <Grid
                                    smMobile={6}
                                    mobile={6}
                                    smTablet={6}
                                    tablet={4}
                                    laptop={2.4}
                                    key={idx}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    className={cx("list-products")}>
                                    <Grid className={cx("list-imgProduct")} onClick={() => handleOpenModal(item)}>
                                        <Image src={item.imgUrl} alt={item.name} className={cx("product-img")} />
                                    </Grid>
                                    <Grid
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        className={cx("list-infoProduct")}>
                                        <p className={cx("list-skuProduct")}>{item.code}</p>
                                        <p className={cx("list-nameProduct")}>{item.name}</p>

                                        <Grid
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            className={cx("product-actions")}>
                                            <Grid className={cx("list-priceProduct")}>{"$" + item.price}</Grid>
                                            <Grid>
                                                <button
                                                    className={cx("action-btn")}
                                                    onClick={() => {
                                                        const itemIndex = listWishlist.findIndex(
                                                            (product) => product.id === item.id
                                                        )
                                                        console.log("itemIndex", itemIndex)
                                                        const itemId = listWishlist.map((item) => item.id)[0]
                                                        console.log("itemId", itemId)
                                                        if (itemIndex >= 0) {
                                                            handleDeleteWishlist(itemId)
                                                        } else {
                                                            handleAddWishlist(item)
                                                        }
                                                    }}>
                                                    <HeartPlusIcon />
                                                </button>
                                                <button
                                                    className={cx("action-btn")}
                                                    onClick={() => handleAddCart(item)}>
                                                    <CartPlusIcon />
                                                </button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid
                                    display="flex"
                                    smMobile={6}
                                    mobile={6}
                                    smTablet={4}
                                    tablet={3}
                                    laptop={2}
                                    key={item.id}
                                    className={cx("list-categories")}
                                    onClick={async () => {
                                        navigate(`/search?Category=${item.categoryName}`)
                                        const response = await categoryApi.getCategory(item.id)
                                        dispatch(categoryActions.getCategory(response))
                                        console.log("response", response)
                                    }}>
                                    <Grid
                                        smMobile={3}
                                        mobile={3}
                                        smTablet={3}
                                        tablet={3}
                                        laptop={3}
                                        className={cx("list-imgCategory")}>
                                        <Image
                                            className={cx("img-category")}
                                            src={item.categoryImageUrl}
                                            alt={item.categoryName}
                                        />
                                    </Grid>

                                    <Grid
                                        smMobile={9}
                                        mobile={9}
                                        smTablet={9}
                                        tablet={9}
                                        laptop={9}
                                        className={cx("list-categoryName")}>
                                        <h3 className={cx("main-category")}>{item.categoryName}</h3>
                                        {/* <div className={cx("sub-categories")}>
                                        <Link to="/" className={cx("sub-categoryItem")}>
                                            Cakes
                                        </Link>
                                        <Link to="/" className={cx("sub-categoryItem")}>
                                            Biscuits
                                        </Link>
                                        <Link to="/" className={cx("sub-categoryItem")}>
                                            Biscuits
                                        </Link>
                                    </div> */}
                                    </Grid>
                                </Grid>
                            )
                        )}
            </Grid>

            <Toaster reverseOrder={true} />
        </div>
    )
}

export default ListItem
