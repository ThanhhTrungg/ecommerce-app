import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Scrollbar } from "swiper"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/scrollbar"

import { BagIcon } from "../Icons"
import priceFormat from "~/utils/priceFormat"
import * as cartActions from "~/redux/cartSlice"
import Products from "~/components/Products"
import Categories from "../Categories"
import * as categoryApi from "~/api/CategoryApi"
import * as productApi from "~/api/ProductApi"
import * as categoryActions from "~/redux/categorySlice"
import * as productActions from "~/redux/productSlice"
import Loading from "~/components/Loading"

import { Toaster } from "react-hot-toast"
import { Grid } from "@mui/material"
import classNames from "classnames/bind"
import styles from "./HomeContent.module.scss"
const cx = classNames.bind(styles)

const HomeContent = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.product)
    const { listCategories } = useSelector((state) => state.category)
    const { listProducts } = useSelector((state) => state.product)
    const { listCart } = useSelector((state) => state.cart)

    useEffect(() => {
        try {
            const fetchApi = async () => {
                dispatch(productActions.setLoading(true))
                const response = await categoryApi.listCategory()
                dispatch(categoryActions.setAllCategories(response))
                dispatch(productActions.setLoading(false))
            }
            fetchApi()
        } catch (error) {
            console.log("Get all categories API is error: ", error.data)
        }
        try {
            const fetchApi = async () => {
                dispatch(productActions.setLoading(true))
                const response = await productApi.listProduct()
                dispatch(productActions.setAllProducts(response))
                dispatch(productActions.setLoading(false))
            }
            fetchApi()
        } catch (error) {
            console.log("Get all products API is error: ", error.data)
        }
    }, [dispatch])

    const getTotal = () => {
        let totalQuantity = 0,
            totalPrice = 0
        listCart.forEach((itemCart) => {
            totalQuantity += itemCart.quantity
            totalPrice += itemCart.price * itemCart.quantity
        })
        return { totalPrice, totalQuantity }
    }

    return (
        <div className={cx("home-content")}>
            <div className={cx("categories-bg")}>
                <div className={cx("contents-header")}>
                    <h2 className={cx("list-header")}>Featured Categories</h2>
                    <p className={cx("list-text")}> Choose your necessary products from this feature categories.</p>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <Grid container display="flex" justifyContent="flex-start">
                        {listCategories &&
                            listCategories.length > 0 &&
                            listCategories.map((category) => <Categories key={category.id} category={category} />)}
                    </Grid>
                )}
            </div>

            <div className={cx("products-bg")}>
                <div className={cx("contents-header")}>
                    <h2 className={cx("list-header")}>Popular Products for Daily Shopping</h2>
                    <p className={cx("list-text")}>
                        See all our popular products in this week. You can choose your daily needs products from this
                        list and get some special offer with free shipping.
                    </p>
                </div>
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    navigation={{ prevEl: ".swiper-btn-prev", nextEl: ".swiper-btn-next" }}
                    spaceBetween={12}
                    loop={false}
                    breakpoints={{
                        1024: {
                            slidesPerView: 5,
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
                    <Grid container display="flex" justifyContent="space-between">
                        {listProducts &&
                            listProducts.length > 0 &&
                            listProducts.map((product, idx) => (
                                <SwiperSlide key={idx}>
                                    {loading ? (
                                        <Loading key={product.id} />
                                    ) : (
                                        <Products key={product.id} product={product} />
                                    )}
                                </SwiperSlide>
                            ))}
                    </Grid>
                </Swiper>
            </div>

            <div
                className={cx("cart-fixed")}
                onClick={() => {
                    dispatch(cartActions.handleOpenDrawer(true))
                }}>
                <div className={cx("cart-info")}>
                    <BagIcon className={cx("bag-icon")} />
                    <span className={cx("quantity")}>
                        {listCart && listCart.length > 0 ? `${listCart.length} items` : "0 item"}
                    </span>
                </div>
                <div className={cx("totalPrice")}>{priceFormat(getTotal().totalPrice)}</div>
            </div>

            <Toaster reverseOrder={true} />
        </div>
    )
}

export default HomeContent
