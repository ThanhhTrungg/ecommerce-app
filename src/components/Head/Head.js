import * as React from "react"
import { Grid } from "@mui/material"
import { CallUsIcon, UserIcon } from "../Icons"
import * as userActions from "~/redux/userSlice"

import classNames from "classnames/bind"
import styles from "./Head.module.scss"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(styles)

const Head = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Grid
            container
            sx={{ display: { smMobile: "none", mobile: "none", smTablet: "none", tablet: "none", laptop: "flex" } }}
            className={cx("head")}>
            <Grid display="flex" alignItems="center" tablet={8} className={cx("contact-us")}>
                <CallUsIcon className={cx("contact-icon")} />
                <p className={cx("contact-content")}>
                    We are available 24/7, Need help? Call Us: <span className={cx("contact-tel")}>+0123456789</span> or{" "}
                    <span className={cx("contact-email")}>mail.support@gmail.com</span>
                </p>
            </Grid>
            <Grid display="flex" alignItems="center" tablet={4} className={cx("head-actions")}>
                <div
                    className={cx("head-account")}
                    onClick={() => {
                        localStorage.getItem("token") && localStorage.getItem("userName")
                            ? navigate("/dashboard-user")
                            : dispatch(userActions.setOpenLoginModal(true))
                    }}>
                    My account
                </div>
                <div
                    className={cx("head-login")}
                    onClick={() => {
                        dispatch(userActions.setOpenLoginModal(true))
                    }}>
                    <UserIcon className={cx("login-icon")} /> Login
                </div>
            </Grid>
        </Grid>
    )
}

export default Head
