import React from "react"
import classNames from "classnames/bind"
import styles from "./NotFound.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import Button from "~/components/Button"

const cx = classNames.bind(styles)

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className={cx("notfound-bg")}>
            <div className={cx("notfound-desc")}>
                <div className={cx("notfound-img")} />
                <div className={cx("notfound-form")}>
                    <h2 className={cx("error-title")}>Page is not found!</h2>
                    <p className={cx("error-text")}>Sorry! This page is not found! Please try again later.</p>
                    <Button className={cx("backtohome-btn")} onClick={() => navigate("/")}>
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
