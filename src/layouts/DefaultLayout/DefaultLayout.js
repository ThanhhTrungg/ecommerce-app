import React from "react"
import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"
import Header from "~/layouts/components/Header"
import Footer from "../components/Footer"
import CartDrawer from "~/components/CartDrawer"
import { useDispatch, useSelector } from "react-redux"
import * as cartActions from "~/redux/cartSlice"

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {
    const dispatch = useDispatch()
    const { listCart, openCartDrawer } = useSelector((state) => state.cart)

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
            <CartDrawer
                isOpen={openCartDrawer}
                handleClose={() => dispatch(cartActions.handleOpenDrawer(false))}
                items={listCart}
            />
            <Footer />
        </div>
    )
}

export default DefaultLayout
