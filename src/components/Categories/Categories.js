import React from "react"
import Image from "~/components/Image"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import * as categoryApi from "~/api/CategoryApi"
import * as categoryActions from "~/redux/categorySlice"
import { useDispatch, useSelector } from "react-redux"

import classNames from "classnames/bind"
import styles from "./Categories.module.scss"
import Loading from "~/components/Loading"
const cx = classNames.bind(styles)

const Categories = ({ categories, title, text, className }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.product)

    const handleSearchProductByCategory = async (name, id) => {
        navigate(`/search?Category=${name}`)
        const response = await categoryApi.getAllProductsByCategory(id)
        dispatch(categoryActions.getProductsByCategory(response))
    }

    return (
        <div className={cx("list-contents", { [className]: className })}>
            <div className={cx("contents-header")}>
                <h2 className={cx("list-header")}>{title}</h2>
                <p className={cx("list-text")}> {text}</p>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <Grid container>
                    {categories.map((category, idx) => (
                        <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start"
                            smMobile={6}
                            mobile={6}
                            smTablet={4}
                            tablet={3}
                            laptop={2}
                            key={idx}
                            className={cx("list-categories")}
                            onClick={() => handleSearchProductByCategory(category.name, category.id)}>
                            <Grid
                                smMobile={3}
                                mobile={3}
                                smTablet={3}
                                tablet={3}
                                laptop={3}
                                className={cx("list-imgCategory")}>
                                <Image className={cx("img-category")} src={category.image} alt={category.title} />
                            </Grid>

                            <Grid
                                smMobile={9}
                                mobile={9}
                                smTablet={9}
                                tablet={9}
                                laptop={9}
                                className={cx("list-categoryName")}>
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
                    ))}
                </Grid>
            )}
        </div>
    )
}

export default Categories
