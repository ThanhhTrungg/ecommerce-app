// Routes config
import config from "../config/config"

// Pages
import Home from "~/pages/Home/Home"
import NotFound from "~/pages/NotFound/NotFound"
import Profile from "~/pages/Profile/Profile"
import UserDashboard from "~/pages/UserDashboard"
import Search from "~/pages/Search"
import ProductDetail from "~/pages/ProductDetail"
import Checkout from "~/pages/Checkout"
import withAuth from "~/HOC/withAuth"
// Public routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.notfound, component: NotFound, layout: null },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.userDashboard, component: UserDashboard },
    { path: config.routes.search, component: Search },
    { path: config.routes.productDetail, component: ProductDetail },
    { path: config.routes.checkout, component: Checkout },
]

// Private routes
export const privateRoutes = []
