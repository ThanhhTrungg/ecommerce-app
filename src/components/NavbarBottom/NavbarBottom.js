import React from "react"
import { CartIcon, HeartIcon, HomeIcon, MenuBarIcon, UserIcon } from "~/components/Icons"
import { Grid, Box } from "@mui/material"
import Button from "~/components/Button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as userActions from "~/redux/userSlice"
import * as cartActions from "~/redux/cartSlice"

import classNames from "classnames/bind"
import styles from "./NavbarBottom.module.scss"
import { auth } from "~/firebase"
const cx = classNames.bind(styles)

const NavbarBottom = ({ className }) => {
    const { listCart } = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Box
            className={cx("navbar-bottom", { [className]: className })}
            sx={{ display: { smMobile: "flex", mobile: "flex", smTablet: "flex", tablet: "flex", laptop: "none" } }}>
            <Grid container alignItems="center" justifyContent="space-between" px="40px">
                <Grid>
                    <button
                        className={cx("navbar-menubar")}
                        onClick={() => {
                            dispatch(cartActions.handleOpenDrawer(true))
                        }}>
                        <MenuBarIcon className={cx("menubar-icon")} />
                    </button>
                </Grid>
                <Grid>
                    <Link to="/" className={cx("navbar-home")}>
                        <HomeIcon className={cx("home-icon")} />
                    </Link>
                </Grid>
                <Grid>
                    <Button
                        className={cx("navbar-cart")}
                        onClick={() => {
                            dispatch(cartActions.handleOpenDrawer(true))
                        }}>
                        <CartIcon className={cx("cart-icon")} />
                        {listCart && listCart.length > 0 ? (
                            <span className={cx("quantity")}>{listCart.length}</span>
                        ) : (
                            ""
                        )}
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        to="/"
                        className={cx("navbar-user")}
                        onClick={() => {
                            const user = auth.currentUser
                            console.log("user", user)
                            user ? navigate("/user-dashboard") : dispatch(userActions.setOpenLoginModal(true))
                        }}>
                        {auth.currentUser ? (
                            <span className={cx("name-loggedIn")}>
                                {auth.currentUser.email.charAt(0).toLocaleUpperCase()}
                            </span>
                        ) : (
                            <UserIcon className={cx("user-icon")} />
                        )}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NavbarBottom
