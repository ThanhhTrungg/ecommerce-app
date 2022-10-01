import { Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import DefaultLayout from "~/layouts/DefaultLayout"
import { publicRoutes } from "~/routes/routes"
import * as productActions from "~/redux/productSlice"

const ScrollTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

function App() {
    const dispatch = useDispatch()
    dispatch(productActions.getProductDetail(null))

    return (
        <Router>
            <ScrollTop />
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component

                        let Layout = DefaultLayout
                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
