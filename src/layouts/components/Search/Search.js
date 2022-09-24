import React from "react"

import classNames from "classnames/bind"
import styles from "./Search.module.scss"
import { SearchIcon } from "~/components/Icons"

const cx = classNames.bind(styles)

const Search = ({ className }) => {
    return (
        <div className={cx("search", { [className]: className })}>
            <input className={cx("search-input")} placeholder="Search for products ..." />
            <button className={cx("search-btn")}>
                <SearchIcon className={cx("search-icon")} />
            </button>
        </div>
    )
}

export default Search
