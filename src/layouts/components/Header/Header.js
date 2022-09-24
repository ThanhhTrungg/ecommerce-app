import React from "react"
import { useNavigate } from "react-router-dom"
import ModalComp from "~/components/ModalComp/ModalComp"

import classNames from "classnames/bind"
import styles from "./Header.module.scss"
import Search from "../Search"
import Head from "~/components/Head"
import Navbar from "~/components/Navbar/Navbar"
import { useScrollY } from "~/hooks"
import { useDispatch, useSelector } from "react-redux"
import Image from "~/components/Image/Image"
import ecommerceService from "~/services/ecommerceService"
import * as userActions from "~/redux/userSlice"
import * as cartActions from "~/redux/cartSlice"
import { Grid } from "@mui/material"
import Button from "~/components/Button"
import { CartIcon, InfoIcon, UserIcon } from "~/components/Icons"
import NavbarBottom from "~/components/NavbarBottom"

const cx = classNames.bind(styles)

const Header = () => {
    const scrollY = useScrollY()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { listCart } = useSelector((state) => state.cart)

    return (
        <header className={cx("wrapper")}>
            <Head />
            <Grid
                container
                className={cx("inner")}
                alignItems="center"
                justifyContent="space-between"
                px={5}
                style={
                    scrollY > 50
                        ? {
                              position: "fixed",
                              top: "0",
                              zIndex: "10",
                              width: "100%",
                              boxShadow: "-1px 16px 17px -8px rgb(0 0 0 / 10%)",
                              transition: "all 0.3s linear",
                          }
                        : {}
                }>
                <Grid
                    display="flex"
                    alignItems="center"
                    tablet={2}
                    laptop={2}
                    sx={{
                        display: { smMobile: "none", mobile: "none", smTablet: "none", tablet: "none", laptop: "flex" },
                    }}
                    className={cx("header-logo")}>
                    <Button className={cx("logo-link")} onClick={() => navigate("/")}>
                        <Image src="https://multikart-react.vercel.app/assets/images/icon/logo.png" alt="logo" />
                    </Button>
                </Grid>
                <Grid
                    display="flex"
                    justifyContent="center"
                    smMobile={12}
                    mobile={12}
                    smTablet={12}
                    tablet={12}
                    laptop={7}
                    className={cx("header-search")}>
                    <Search />
                </Grid>
                <Grid
                    display="flex"
                    laptop={2}
                    sx={{
                        display: { smMobile: "none", mobile: "none", smTablet: "none", tablet: "none", laptop: "flex" },
                    }}
                    alignItems="center"
                    justifyContent="space-between"
                    className={cx("actions")}>
                    <button className={cx("action-btn")}>
                        <InfoIcon className={cx("act-info")} />
                    </button>

                    <Button
                        className={cx("action-btn")}
                        onClick={() => {
                            dispatch(cartActions.handleOpenDrawer(true))
                            dispatch(ecommerceService.getListCart())
                        }}>
                        <CartIcon className={cx("act-bag")} />
                        {listCart.cartItems && listCart.cartItems.length > 0 ? (
                            <span className={cx("quantity")}>{listCart.cartItems.length}</span>
                        ) : (
                            ""
                        )}
                    </Button>
                    <Button
                        className={cx("action-btn")}
                        onClick={() => {
                            localStorage.getItem("token") && localStorage.getItem("userName")
                                ? navigate("/dashboard-user")
                                : dispatch(userActions.setOpenLoginModal(true))
                        }}>
                        <UserIcon className={cx("act-user")} />
                    </Button>
                </Grid>
            </Grid>
            <Navbar />
            <NavbarBottom />
            <ModalComp />
        </header>
    )
}

export default Header
