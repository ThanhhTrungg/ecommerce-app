import React from "react"
import { CartIcon, HeartIcon, HomeIcon, MenuBarIcon, UserIcon } from "~/components/Icons"
import { Grid, Box } from "@mui/material"
import Button from "~/components/Button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as useActions from "~/redux/userSlice"
import ecommerceService from "~/services/ecommerceService"
import * as cartActions from "~/redux/cartSlice"

import classNames from "classnames/bind"
import styles from "./NavbarBottom.module.scss"
const cx = classNames.bind(styles)

const NavbarBottom = ({ className }) => {
    const { listCart } = useSelector((state) => state.cart)
    const { listWishlist } = useSelector((state) => state.wishlist)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Box
            className={cx("navbar-bottom", { [className]: className })}
            sx={{ display: { smMobile: "flex", mobile: "flex", smTablet: "flex", tablet: "flex", laptop: "none" } }}>
            <Grid container alignItems="center" justifyContent="space-between" px="40px">
                <Grid>
                    <button className={cx("navbar-menubar")}>
                        <MenuBarIcon className={cx("menubar-icon")} />
                    </button>
                </Grid>
                <Grid>
                    <Link to="/" className={cx("navbar-home")}>
                        <HomeIcon className={cx("home-icon")} />
                    </Link>
                </Grid>
                <Grid>
                    <Button to="/" className={cx("navbar-wishlist")}>
                        <HeartIcon className={cx("wishlist-icon")} />
                        {listWishlist && listWishlist.length > 0 ? (
                            <span className={cx("quantity")}>{listWishlist.length}</span>
                        ) : (
                            ""
                        )}
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        className={cx("navbar-cart")}
                        onClick={() => {
                            dispatch(cartActions.handleOpenDrawer(true))
                        }}>
                        <CartIcon className={cx("cart-icon")} />
                        {listCart.cartItems && listCart.cartItems.length > 0 ? (
                            <span className={cx("quantity")}>{listCart.cartItems.length}</span>
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
                            localStorage.getItem("token") && localStorage.getItem("userName")
                                ? navigate("/dashboard-user")
                                : dispatch(useActions.setOpenLoginModal(true))
                        }}>
                        <UserIcon className={cx("user-icon")} />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NavbarBottom
