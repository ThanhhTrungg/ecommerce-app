import React from "react"

import Header from "~/layouts/components/Header"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import * as cartActions from "~/redux/cartSlice"
import ProductModal from "../components/ProductModal"
import ModalComp from "~/layouts/components/ModalComp/ModalComp"
import CartItem from "../../components/CartItem"

import DrawerWrapper from "../components/DrawerWrapper"
import MenuBottom from "~/components/MenuBottom"
import CartLayout from "~/layouts/components/CartLayout"

import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"
const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {
    const dispatch = useDispatch()
    const { openCartDrawer } = useSelector((state) => state.cart)
    const { productDetail, openProductModal } = useSelector((state) => state.product)

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>

            <DrawerWrapper
                anchor="right"
                isOpen={openCartDrawer}
                handleClose={() => dispatch(cartActions.handleOpenDrawer(false))}>
                <CartLayout />
            </DrawerWrapper>
            {/* <DrawerWrapper
                anchor="left"
                isOpen={openCartDrawer}
                handleClose={() => dispatch(cartActions.handleOpenDrawer(false))}>
                <MenuBottom />
            </DrawerWrapper> */}
            <ModalComp />
            <ProductModal product={productDetail} isOpened={openProductModal} />
            <Footer />
        </div>
    )
}

export default DefaultLayout
