import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
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
import Products from "~/components/Products"
import * as productApi from "~/api/ProductApi"
import * as productActions from "~/redux/productSlice"
import * as cartActions from "~/redux/cartSlice"
import toast from "react-hot-toast"

const cx = classNames.bind(styles)

const ProductDetail = () => {
    const { id } = useParams()
    const { productDetail } = useSelector((state) => state.product)
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchApi = async () => {
            const response = await productApi.getProduct(`${id}`)
            setProduct(response)
        }
        fetchApi()
    }, [])

    const handleAddToCart = (product, quantity) => {
        dispatch(cartActions.incrementByAmount({ product, quantity }))
        toast.success(`${quantity} ${product.title} added to cart`, {
            duration: 3000,
            position: "bottom-left",
        })
    }

    return (
        <>
            {product && (
                <>
                    <div className={classNames(styles.breadCrumbs)}>
                        <Link className={classNames(styles.home)} to="/">
                            Home
                        </Link>
                        <ArrowHorizonIcon />
                        <Link className={classNames(styles.category)} to="/">
                            Home
                        </Link>
                        <ArrowHorizonIcon />
                        <p className={classNames(styles.productName)}>{product.title}</p>
                    </div>

                    <div className={classNames(styles.detailContainer)}>
                        <div className={classNames(styles.detailImg)}>
                            <Image className={classNames(styles.imgProduct)} src={product.images} alt={product.title} />
                        </div>
                        <div className={classNames(styles.detailContent)}>
                            <div>
                                <div className={classNames(styles.detailHeader)}>
                                    <h1 className={classNames(styles.contentHead)}>{product.title}</h1>
                                    <span className={classNames(styles.contentSku)}>SKU: {product.code}</span>
                                </div>
                                <p className={classNames(styles.contentDes)}>{product.description}</p>
                                <span className={classNames(styles.contentPrice)}>{"$" + product.price}</span>

                                <div display="flex" className={classNames(styles.qtyCate)}>
                                    <div className={classNames(styles.quantityActions)}>
                                        <Button
                                            className={classNames(styles.btnMinus)}
                                            onClick={() => setQuantity(quantity - 1 >= 1 ? 1 : quantity - 1)}>
                                            <MinusIcon />
                                        </Button>

                                        <span className={classNames(styles.spanQuantity)}>{quantity}</span>

                                        <Button
                                            className={classNames(styles.btnPlus)}
                                            onClick={() => setQuantity(quantity + 1)}>
                                            <PlusIcon />
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            className={classNames(styles.actionAddCart)}
                                            onClick={() => handleAddToCart(product, quantity)}>
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                                <div className={classNames(styles.footerModal)}>
                                    <div>
                                        <span className={classNames(styles.belongCategory)}>
                                            <span>Category: </span> {product.title}
                                        </span>
                                        <span className={classNames(styles.smBelongCategory)}>{product.title}</span>
                                    </div>
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
                            <div>
                                <div>
                                    <ShippingIcon />
                                    Free shipping apply to all orders over shipping $100
                                </div>
                                <div>
                                    <HomeIcon />
                                    Home Delivery within 1 Hour
                                </div>
                                <div>
                                    <DollarIcon />
                                    Cash on Delivery Available
                                </div>
                                <div>
                                    <RotationIcon />7 Days returns money back guarantee
                                </div>
                                <div>
                                    <XShieldIcon />
                                    Warranty not available this item
                                </div>

                                <div>
                                    <LocationIcon />
                                    Delivery from our pick point Cecilia Chapman, 561-4535 Nulla LA, United States 96522
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetail
