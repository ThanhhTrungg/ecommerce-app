import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Scrollbar } from "swiper"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/scrollbar"

import * as productActions from "~/redux/productSlice"
import * as cartActions from "~/redux/cartSlice"

import toast, { Toaster } from "react-hot-toast"
import Image from "../Image"
import { CartPlusIcon } from "../Icons"

import classNames from "classnames/bind"
import styles from "./Products.module.scss"
import Loading from "~/components/Loading"

const cx = classNames.bind(styles)

const Products = ({ products, title, text, className }) => {
    const dispatch = useDispatch()
    let { loading } = useSelector((state) => state.product)

    // open modal product detail
    const handleOpenModal = (product) => {
        dispatch(productActions.getProductDetail(product))
    }

    const handleAddCart = (product) => {
        dispatch(cartActions.addToCart(product))
        toast.success("Product has been added to cart", {
            duration: 3000,
            position: "bottom-left",
        })
    }

    return (
        <div className={cx("list-contents", { [className]: className })}>
            <div className={cx("contents-header")}>
                <h2 className={cx("list-header")}>{title}</h2>
                <p className={cx("list-text")}> {text}</p>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    navigation={{ prevEl: ".swiper-btn-prev", nextEl: ".swiper-btn-next" }}
                    spaceBetween={12}
                    loop={false}
                    breakpoints={{
                        1024: {
                            slidesPerView: 6,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        320: {
                            slidesPerView: 2,
                        },
                    }}>
                    {products &&
                        products.length > 0 &&
                        products.map((product, idx) => (
                            <SwiperSlide key={idx}>
                                <div className={cx("list-products")}>
                                    <div className={cx("list-imgProduct")} onClick={() => handleOpenModal(product)}>
                                        <Image src={product.images} alt={product.title} className={cx("product-img")} />
                                    </div>
                                    <div className={cx("list-infoProduct")}>
                                        <p className={cx("list-skuProduct")}>{product.code}</p>
                                        <p className={cx("list-nameProduct")}>{product.title}</p>

                                        <div className={cx("product-actions")}>
                                            <span className={cx("list-priceProduct")}>{"$" + product.price}</span>
                                            <button className={cx("action-btn")} onClick={() => handleAddCart(product)}>
                                                <CartPlusIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            )}

            <Toaster reverseOrder={true} />
        </div>
    )
}

export default Products
