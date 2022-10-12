import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    ArrowHorizonIcon,
    CircleFBIcon,
    DollarIcon,
    HomeIcon,
    LinkedinIcon,
    LocationIcon,
    MinusIcon,
    PinterestIcon,
    PlusIcon,
    RotationIcon,
    ShippingIcon,
    TweeterIcon,
    WhatsappIcon,
    XShieldIcon,
} from "~/components/Icons"

import classNames from "classnames/bind"
import styles from "./ProductDetail.module.scss"
import { useDispatch, useSelector } from "react-redux"
import Image from "~/components/Image"
import Button from "~/components/Button"
import * as productApi from "~/api/ProductApi"
import * as productActions from "~/redux/productSlice"
import * as cartActions from "~/redux/cartSlice"
import * as categoryApi from "~/api/CategoryApi"
import * as categoryActions from "~/redux/categorySlice"
import toast, { Toaster } from "react-hot-toast"
import Loading from "~/components/Loading"
import { Grid } from "@mui/material"
import Products from "~/components/Products"

const ProductDetail = () => {
    const { productDetail, loading, product } = useSelector((state) => state.product)
    const { products } = useSelector((state) => state.category)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchApi = async () => {
            dispatch(productActions.setLoading(true))
            const response = await productApi.getProduct(productDetail.id)
            dispatch(productActions.setProduct(response))
            dispatch(productActions.setLoading(false))
        }
        fetchApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await categoryApi.getAllProductsByCategory(productDetail.category.id)
            dispatch(categoryActions.getProductsByCategory(response))
        }
        fetchApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const handleAddToCart = (product, quantity) => {
        dispatch(cartActions.incrementByAmount({ product, quantity }))
        toast.success(`${quantity} ${product.title} added to cart`, {
            duration: 3000,
            position: "bottom-left",
        })
    }

    return (
        <>
            {loading ? (
                <Loading modalBg />
            ) : (
                product &&
                product.category && (
                    <>
                        <div className={classNames(styles.productDetail_page)}>
                            <div className={classNames(styles.breadCrumbs)}>
                                <Link className={classNames(styles.home)} to="/">
                                    <strong>Home</strong>
                                </Link>
                                <ArrowHorizonIcon />
                                <Link
                                    className={classNames(styles.category)}
                                    to={`/search?Category=${product.category.name}`}
                                    onClick={async () => {
                                        dispatch(productActions.setLoading(true))
                                        const response = await categoryApi.getAllProductsByCategory(product.category.id)
                                        dispatch(categoryActions.getProductsByCategory(response))
                                        dispatch(productActions.setLoading(false))
                                    }}>
                                    <strong>{product.category.name}</strong>
                                </Link>
                                <ArrowHorizonIcon />
                                <p className={classNames(styles.productName)}>{product.title}</p>
                            </div>
                            <div className={classNames(styles.detailContainer)}>
                                <div className={classNames(styles.detailImg)}>
                                    <Image
                                        className={classNames(styles.imgProduct)}
                                        src={product.images}
                                        alt={product.title}
                                    />
                                </div>
                                <div className={classNames(styles.detailContent)}>
                                    <div className={classNames(styles.detailContentLeft)}>
                                        <div className={classNames(styles.detailHeader)}>
                                            <h1 className={classNames(styles.contentHead)}>{product.title}</h1>
                                            <span className={classNames(styles.contentSku)}>SKU: {product.code}</span>
                                        </div>
                                        <span className={classNames(styles.contentPrice)}>{"$" + product.price}</span>
                                        <p className={classNames(styles.contentDes)}>{product.description}</p>

                                        <Grid container className={classNames(styles.qtyCate)}>
                                            <Grid
                                                desktop={6}
                                                laptop={6}
                                                tablet={6}
                                                smTablet={3}
                                                mobile={3}
                                                smMobile={3}
                                                className={classNames(styles.quantityActions)}>
                                                <Button
                                                    className={classNames(styles.btnMinus)}
                                                    onClick={() => setQuantity(quantity - 1 > 1 ? quantity - 1 : 1)}>
                                                    <MinusIcon />
                                                </Button>

                                                <span className={classNames(styles.spanQuantity)}>{quantity}</span>

                                                <Button
                                                    className={classNames(styles.btnPlus)}
                                                    onClick={() => setQuantity(quantity + 1)}>
                                                    <PlusIcon />
                                                </Button>
                                            </Grid>
                                            <Grid
                                                desktop={6}
                                                laptop={6}
                                                tablet={6}
                                                smTablet={9}
                                                mobile={9}
                                                smMobile={9}
                                                width="100%"
                                                height="100%"
                                                marginLeft="16px">
                                                <Button
                                                    className={classNames(styles.actionAddCart)}
                                                    onClick={() => handleAddToCart(product, quantity)}>
                                                    Add to Cart
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <div className={classNames(styles.footerModal)}>
                                            <div>
                                                <span className={classNames(styles.belongCategory)}>
                                                    <span>Category: </span> {product.title}
                                                </span>
                                            </div>
                                            <span className={classNames(styles.smBelongCategory)}>{product.title}</span>
                                        </div>
                                        <div className={classNames(styles.socialNetwork)}>
                                            <h3>Share your social network</h3>
                                            <p>For get lots of traffic from social network share this product</p>
                                            <div>
                                                <CircleFBIcon />
                                                <TweeterIcon />
                                                <PinterestIcon />
                                                <LinkedinIcon />
                                                <WhatsappIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classNames(styles.detailContentRight)}>
                                        <div>
                                            <ShippingIcon />
                                            <p>
                                                Free shipping apply to all orders over shipping <strong>$100</strong>
                                            </p>
                                        </div>
                                        <div>
                                            <HomeIcon />
                                            <p>
                                                Home Delivery within <strong>1 Hour</strong>
                                            </p>
                                        </div>
                                        <div>
                                            <DollarIcon />
                                            <p>Cash on Delivery Available</p>
                                        </div>
                                        <div>
                                            <RotationIcon />
                                            <p>
                                                <strong>7</strong> Days returns money back guarantee
                                            </p>
                                        </div>
                                        <div>
                                            <XShieldIcon />
                                            <p>Warranty not available this item</p>
                                        </div>

                                        <div>
                                            <LocationIcon />
                                            <p>
                                                Delivery from our pick point Cecilia Chapman, 561-4535 Nulla LA, United
                                                States 96522
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classNames(styles.relatedProducts)}>
                                <div className={classNames(styles.contentsHeader)}>
                                    <h3 className={classNames(styles.listHeader)}>Related Products</h3>
                                </div>

                                <Grid container>
                                    {products.map((prod) => (
                                        <Grid
                                            display="inline-flex"
                                            gap={4}
                                            key={prod.id}
                                            desktop={2}
                                            laptop={3}
                                            tablet={3}
                                            smTablet={4}
                                            mobile={6}
                                            smMobile={6}>
                                            <Products product={prod} className={classNames(styles.prod)} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                        <Toaster />
                    </>
                )
            )}
        </>
    )
}

export default ProductDetail
