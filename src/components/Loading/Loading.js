import React from "react"
import classNames from "classnames/bind"
import styles from "./Loading.module.scss"

const cx = classNames.bind(styles)

const Loading = ({ modalBg }) => {
    return (
        <div className={cx("loading-container", modalBg ? "modalBg" : "")}>
            <span className={cx("loading-item")} />
            <span className={cx("loading-item")} />
            <span className={cx("loading-item")} />
            <span className={cx("loading-item")} />
            <span className={cx("loading-item")} />
        </div>
    )
}

export default Loading
