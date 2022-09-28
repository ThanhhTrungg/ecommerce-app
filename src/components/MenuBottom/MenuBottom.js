import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "~/components/Image"
import { ButtonPage, CategoriesResult } from "../Navbar/Navbar"
import * as cartActions from "~/redux/cartSlice"

const MenuBottom = () => {
    const dispatch = useDispatch()
    const { listCategories } = useSelector((state) => state.category)

    return (
        <div>
            <div>
                <Image src="https://multikart-react.vercel.app/assets/images/icon/logo.png" alt="logo" />
                <span onClick={() => dispatch(cartActions.handleOpenDrawer(false))}>X</span>
            </div>
            <div>
                <h2>All Categories</h2>
                <CategoriesResult />
            </div>
            <div>
                <h2>Pages</h2>
                <ButtonPage />
            </div>
        </div>
    )
}

export default MenuBottom
