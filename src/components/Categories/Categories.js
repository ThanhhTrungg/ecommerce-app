import React from "react"
import Image from "~/components/Image"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import * as categoryApi from "~/api/CategoryApi"
import * as categoryActions from "~/redux/categorySlice"
import { useDispatch } from "react-redux"
import * as productActions from "~/redux/productSlice"

import classNames from "classnames/bind"
import styles from "./Categories.module.scss"
const cx = classNames.bind(styles)

const Categories = ({ category }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Grid
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            smMobile={6}
            mobile={6}
            smTablet={4}
            tablet={3}
            laptop={2}
            className={cx("list-categories")}
            onClick={async () => {
                navigate(`/search?Category=${category.name}`)
                dispatch(productActions.setLoading(true))
                const response = await categoryApi.getAllProductsByCategory(category.id)
                dispatch(categoryActions.getProductsByCategory(response))
                dispatch(productActions.setLoading(false))
            }}>
            <Grid smMobile={3} mobile={3} smTablet={3} tablet={3} laptop={3} className={cx("list-imgCategory")}>
                <Image className={cx("img-category")} src={category.image} alt={category.title} />
            </Grid>

            <Grid smMobile={9} mobile={9} smTablet={9} tablet={9} laptop={9} className={cx("list-categoryName")}>
                <h3 className={cx("main-category")}>{category.name}</h3>
                {/* <div className={cx("sub-categories")}>
                                <Link to="/" className={cx("sub-categoryItem")}>
                                    Cakes
                                </Link>
                                <Link to="/" className={cx("sub-categoryItem")}>
                                    Biscuits
                                </Link>
                                <Link to="/" className={cx("sub-categoryItem")}>
                                    Biscuits
                                </Link>
                            </div> */}
            </Grid>
        </Grid>
    )
}

export default Categories
