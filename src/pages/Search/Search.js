import React, {  useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Scrollbar } from "swiper"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/scrollbar"
import { useDispatch, useSelector } from "react-redux"
import Image from "~/components/Image"

import classNames from "classnames/bind"
import styles from "./Search.module.scss"
import Button from "~/components/Button"
import { ArrowHorizonIcon } from "~/components/Icons"
import { useNavigate } from "react-router-dom"
import * as categoryActions from "~/redux/categorySlice"
import * as productActions from "~/redux/productSlice"
import * as categoryApi from "~/api/CategoryApi"
import Products from "~/components/Products"

const cx = classNames.bind(styles)

const Search = () => {
    const navigate = useNavigate()
    const { listCategories, products } = useSelector((state) => state.category)
    const { sortPrice } = useSelector((state) => state.product)
    const [order, setOrder] = useState("asc")
    const [filterProductList, setFilterProductList] = useState([])
    console.log("filterProductList", filterProductList)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const response = await categoryApi.getAllProductsByCategory(category.id)
    //         dispatch(categoryActions.getProductsByCategory(response))
    //     }
    //     fetchApi()
    // }, [])

    const handleCategoryContent = async (category) => {
        navigate(`/search?Category=${category.name}`)
        const response = await categoryApi.getAllProductsByCategory(category.id)
        const result = [...response, order]
        setFilterProductList(result)
        dispatch(categoryActions.getProductsByCategory(result))
    }

    const handleOrderChangeAsc = () => {
        setOrder("asc")
    }
    const handleOrderChangeDesc = () => {
        setOrder("desc")
    }

    return (
        <div className={cx("search-background")}>
            <div className={cx("listCategories-content")}>
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={8}
                    loop={false}
                    navigation={{ prevEl: ".btn-prev", nextEl: ".btn-next" }}
                    className={cx("swiper-content")}>
                    {listCategories &&
                        listCategories.length > 0 &&
                        listCategories.map((category, idx) => (
                            <SwiperSlide
                                key={idx}
                                className={cx("category-content")}
                                onClick={() => handleCategoryContent(category)}>
                                <div className={cx("category-img")}>
                                    <Image src={category.image} alt={category.name} />
                                </div>
                                <h3>{category.name}</h3>
                            </SwiperSlide>
                        ))}
                    <Button className={cx("btn-prev")} leftIcon={<ArrowHorizonIcon />} />
                    <Button className={cx("btn-next")} leftIcon={<ArrowHorizonIcon />} />
                </Swiper>
            </div>

            <div className={cx("product-content")}>
                {products && products.length > 0 ? (
                    <div className={cx("sort-price")}>
                        <p className={cx("sort-text")}>
                            Total <strong>{products.length}</strong> items Found
                        </p>
                        <select
                            className={cx("sort-select")}
                            value={sortPrice}
                            onChange={async (e) => {
                                dispatch(productActions.sortPrice(products))
                            }}>
                            <option value="" selected disabled hidden>
                                Sort By Price
                            </option>
                            <option value="lowest" onClick={handleOrderChangeAsc}>
                                Low to High
                            </option>
                            <option value="highest" onClick={handleOrderChangeDesc}>
                                High to Low
                            </option>
                        </select>
                    </div>
                ) : (
                    ""
                )}
                {products && products.length > 0 ? (
                    <Products products={products} className={cx("search-products")} />
                ) : (
                    <div className={cx("empty-content")}>
                        <Image src="https://kachabazar-store.vercel.app/no-result.svg" alt="No products" />
                        <p>Sorry, we can not find this product 😔</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search
