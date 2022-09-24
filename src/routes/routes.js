// Routes config
import config from "../config/config"

// Pages
import Home from "~/pages/Home/Home"
import NotFound from "~/pages/NotFound/NotFound"
import Profile from "~/pages/Profile/Profile"
import UserDashboard from "~/pages/UserDashboard"
import Wishlist from "~/pages/Wishlist/Wishlist"
import Cart from "~/pages/Cart"
import Search from "~/pages/Search"
// Public routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.notfound, component: NotFound, layout: null },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.dashboardUser, component: UserDashboard },
    { path: config.routes.wishlist, component: Wishlist },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.search, component: Search },
]

// Private routes
export const privateRoutes = []
