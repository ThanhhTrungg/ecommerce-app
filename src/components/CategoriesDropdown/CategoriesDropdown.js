import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Image from "../Image"
import * as categoryActions from "~/redux/categorySlice"
import * as categoryApi from "~/api/CategoryApi"
import { ArrowDownIcon } from "../Icons"

import classNames from "classnames/bind"
import styles from "./CategoriesDropdown.module.scss"

const cx = classNames.bind(styles)

const CategoriesDropdown = ({ categories, icon }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <>
            {categories.map((category, idx) => (
                <button
                    className={cx("category-item")}
                    key={idx}
                    onClick={async () => {
                        navigate(`/search?Category=${category.name}`)
                        const response = await categoryApi.getAllProductsByCategory(category.id)
                        dispatch(categoryActions.getProductsByCategory(response))
                    }}>
                    <Image className={cx("category-img")} src={category.image} alt={category.name} />
                    <div className={cx("category-info")}>
                        <span className={cx("category-name")}>{category.name}</span>
                        {icon && (
                            <span className={cx("category-icon")}>
                                <ArrowDownIcon className={cx("arrowDown-icon")} />
                            </span>
                        )}
                    </div>
                </button>
            ))}
        </>
    )
}

export default CategoriesDropdown
