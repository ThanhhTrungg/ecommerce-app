import React from "react"
import classNames from "classnames/bind"
import styles from "./Categories.module.scss"
import Image from "~/components/Image"
import { ArrowDownIcon } from "../Icons"

const cx = classNames.bind(styles)

const Categories = ({ data, onClick, icon, type }) => {
    return (
        <>
            {data.map((item) =>
                type ? (
                    <button className={cx("category-item")} key={item.id} onClick={onClick}>
                        <Image className={cx("category-img")} src={item.categoryImageUrl} alt={item.categoryName} />
                        <div className={cx("category-info")}>
                            <span className={cx("category-name")}>{item.categoryName}</span>
                            {icon && (
                                <span className={cx("category-icon")}>
                                    <ArrowDownIcon className={cx("arrowDown-icon")} />
                                </span>
                            )}
                        </div>
                    </button>
                ) : (
                    <button className={cx("category-item")} key={item.id} onClick={onClick}>
                        <Image className={cx("category-img")} src={item.categoryImageUrl} alt={item.categoryName} />
                        <div className={cx("category-info")}>
                            <span className={cx("category-name")}>{item.categoryName}</span>
                            {icon && (
                                <span className={cx("category-icon")}>
                                    <ArrowDownIcon className={cx("arrowDown-icon")} />
                                </span>
                            )}
                        </div>
                    </button>
                )
            )}
        </>
    )
}

export default Categories
