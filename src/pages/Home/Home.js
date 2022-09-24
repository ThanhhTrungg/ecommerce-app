import React from "react"
import CartDrawer from "~/components/CartDrawer"
import HomeContent from "~/components/HomeContent"
import HomeSlide from "~/components/HomeSlide/HomeSlide"
import { useDispatch, useSelector } from "react-redux"
import * as cartActions from "~/redux/cartSlice"

const Home = () => {

    return (
        <>
            <HomeSlide />
            <HomeContent />
        </>
    )
}

export default Home
