import React, { useState } from "react"
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

const cx = classNames.bind(styles)

const Search = () => {
    const navigate = useNavigate()
    const { listCategories, category } = useSelector((state) => state.category)
    const { sortPrice } = useSelector((state) => state.product)
    const dispatch = useDispatch()

    

    return (
        <div className={cx("search-background")}>
            <div className={cx("listCategories-content")}>
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={7}
                    loop={true}
                    navigation={{ prevEl: ".btn-prev", nextEl: ".btn-next" }}
                    className={cx("swiper-content")}>
                    {listCategories &&
                        listCategories.length > 0 &&
                        listCategories.map((category, idx) => (
                            <SwiperSlide
                                key={idx}
                                className={cx("category-content")}
                                onClick={async () => {
                                    navigate(`/search?Category=${category.categoryName}`)
                                    const response = await categoryApi.getCategory(category.id)
                                    dispatch(categoryActions.getCategory(response))
                                }}>
                                <div className={cx("category-img")}>
                                    <Image src={category.categoryImageUrl} alt={category.categoryName} />
                                </div>
                                <h3>{category.categoryName}</h3>
                            </SwiperSlide>
                        ))}
                    <Button className={cx("btn-prev")} leftIcon={<ArrowHorizonIcon />} />
                    <Button className={cx("btn-next")} leftIcon={<ArrowHorizonIcon />} />
                </Swiper>
            </div>

            <div className={cx("product-content")}>
                {category.product && category.product.length > 0 ? (
                    <div className={cx("sort-price")}>
                        <p className={cx("sort-text")}>
                            Total <strong>{category.product.length}</strong> items Found
                        </p>
                        <select
                            className={cx("sort-select")}
                            value={sortPrice}
                            onChange={async (e) => {
                                dispatch(productActions.sortPrice(category.product))
                            }}>
                            <option value="" selected disabled hidden>
                                Sort By Price
                            </option>
                            <option value="lowest">Low to High</option>
                            <option value="highest">High to Low</option>
                        </select>
                    </div>
                ) : (
                    ""
                )}
                {category.product && category.product.length > 0 ? (
                    category.product.map((item, idx) => (
                        <div key={idx}>
                            <Image src={item.productImageUrl} alt={item.productName} className={"product-img"} />
                            <p className={"list-skuProduct"}>{item.productCode}</p>
                            <p className={"list-nameProduct"}>{item.productName}</p>
                            <p className={"list-nameProduct"}>{item.productPrice}</p>
                        </div>
                    ))
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
