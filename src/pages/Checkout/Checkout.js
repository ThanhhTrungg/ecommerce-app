import React, { useRef, useState } from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"

import classNames from "classnames/bind"
import styles from "./Checkout.module.scss"
import InputField from "~/components/InputField"
import CartItem from "~/components/CartItem"
import { useSelector } from "react-redux"
import Button from "~/components/Button"
import priceFormat from "~/utils/priceFormat"
import toast from "react-hot-toast"
import { ArrowNextIcon, BagGreyIcon, CardIcon, ShippingIcon, UndoIcon, WalletIcon } from "~/components/Icons"
import PaymentInputs from "~/components/PaymentInputs"
import { Link } from "react-router-dom"

const cx = classNames.bind(styles)

const Checkout = () => {
    const { listCart } = useSelector((state) => state.cart)
    const [shippingCost, setShippingCost] = useState(0)
    const [couponCode, setCouponCode] = useState("")
    const fedExRef = useRef()
    const upsRef = useRef()
    const delivery = useRef()
    const credit = useRef()
    const [paymentInputs, setPaymentInputs] = useState(false)

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        country: "",
        zipCode: "",
        shippingOption: "",
        paymentMethod: "",
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required!"),
        lastName: Yup.string().required("Last name is required!"),
        email: Yup.string().email("Email is invalid").required("Email address is required!"),
        phoneNumber: Yup.string().required("Phone number is required!"),
        streetAddress: Yup.string().required("Street address is required!"),
        city: Yup.string().required("City is required!"),
        country: Yup.string().required("Country is required!"),
        zipCode: Yup.string().required("ZIP / Postal is required!"),
        shippingOption: Yup.string().required("Shipping Option is required!"),
        paymentMethod: Yup.string().required("Payment Method is required!"),
    })

    const onSubmit = async (values) => {
        try {
            // const res = await signInWithEmailAndPassword(auth, values.email, values.password)
            // console.log("res", res)
            toast.success("Login Success!", {
                duration: 3000,
                position: "bottom-right",
            })
        } catch (err) {
            console.error("err", err.message)
            toast.error(err.message, {
                duration: 3000,
                position: "bottom-right",
            })
            if (err.code === "auth/user-not-found") {
                return err.status(400).json({
                    message: console.log("User not found"),
                })
            } else {
                return err.status(500).json({
                    message: console.log("Something went wrong, Please try again later"),
                })
            }
        }
    }

    const getTotal = () => {
        let totalQuantity = 0
        let totalPrice = 0
        listCart.forEach((itemCart) => {
            totalQuantity += itemCart.quantity
            totalPrice += itemCart.price * itemCart.quantity
        })
        return { totalPrice, totalQuantity }
    }

    const listCoupon = ["123", "aab456", "c2730"]

    return (
        <div className={cx("checkout-bg")}>
            <div className={cx("checkout-card")}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {() => (
                        <Form className={cx("form-checkout")}>
                            <div className={cx("personal-info")}>
                                <h2 className={cx("checkout-head")}>01. Personal Details</h2>
                                <div className={cx("wrapper-flex")}>
                                    <InputField
                                        label="First Name"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className={cx("form-inputPersonal")}
                                    />

                                    <InputField
                                        label="Last Name"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className={cx("form-inputPersonal")}
                                    />
                                </div>

                                <div className={cx("wrapper-flex")}>
                                    <InputField
                                        label="Email address"
                                        type="text"
                                        name="email"
                                        placeholder="youremail@gmail.com"
                                        className={cx("form-inputPersonal")}
                                    />

                                    <InputField
                                        label="Phone number"
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone number"
                                        className={cx("form-inputPersonal")}
                                    />
                                </div>
                            </div>

                            <div className={cx("shipping-info")}>
                                <h2 className={cx("checkout-head")}>02. Shipping Details</h2>
                                <InputField
                                    label="Street address"
                                    type="text"
                                    name="streetAddress"
                                    placeholder="Street"
                                    className={cx("form-inputShipping")}
                                />

                                <div className={cx("wrapper-flex")}>
                                    <InputField
                                        label="City"
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        className={cx("form-inputShipping")}
                                    />
                                    <InputField
                                        label="Country"
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        className={cx("form-inputShipping")}
                                    />

                                    <InputField
                                        label="ZIP / Postal"
                                        type="text"
                                        name="zipCode"
                                        placeholder="Zip / Postal"
                                        className={cx("form-inputShipping")}
                                    />
                                </div>
                                <div>
                                    <label className={cx("label-info")}>Shipping Cost</label>
                                    <div className={cx("wrapper-flex")}>
                                        <div
                                            laptop={6}
                                            tablet={6}
                                            className={cx("cost-card")}
                                            onClick={() => {
                                                fedExRef.current.click()
                                                setShippingCost(fedExRef.current.value)
                                            }}>
                                            <ShippingIcon className={cx("shipAndPay")} />
                                            <div style={{ flex: 1, marginLeft: "12px" }}>
                                                <h6>FedEx</h6>
                                                <p>Delivery: Today Cost : $60.00</p>
                                            </div>
                                            <input
                                                type="radio"
                                                name="shippingOption"
                                                value="60"
                                                ref={fedExRef}
                                                className={cx("shipping-radio")}
                                            />
                                        </div>
                                        <div
                                            laptop={6}
                                            tablet={6}
                                            className={cx("cost-card")}
                                            onClick={() => {
                                                upsRef.current.click()
                                                setShippingCost(upsRef.current.value)
                                            }}>
                                            <ShippingIcon className={cx("shipAndPay")} />
                                            <div style={{ flex: 1, marginLeft: "12px" }}>
                                                <h6>UPS</h6>
                                                <p>Delivery: 7 Days Cost : $20.00</p>
                                            </div>
                                            <input
                                                type="radio"
                                                name="shippingOption"
                                                value="20"
                                                ref={upsRef}
                                                className={cx("shipping-radio")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx("payment-info")}>
                                <h2 className={cx("checkout-head")}>03. Payment Details</h2>
                                {paymentInputs ? <PaymentInputs /> : ""}
                                <div className={cx("wrapper-flex")}>
                                    <div
                                        className={cx("payment-method")}
                                        onClick={() => {
                                            setPaymentInputs(false)
                                            delivery.current.click()
                                        }}>
                                        <WalletIcon className={cx("shipAndPay")} />
                                        <h6 style={{ flex: 1, marginLeft: "12px", fontWeight: "400" }}>
                                            Cash On Delivery
                                        </h6>
                                        <input
                                            ref={delivery}
                                            type="radio"
                                            name="paymentMethod"
                                            className={cx("paymentInput")}
                                        />
                                    </div>
                                    <div
                                        className={cx("payment-method")}
                                        onClick={() => {
                                            setPaymentInputs(true)
                                            credit.current.click()
                                        }}>
                                        <CardIcon className={cx("shipAndPay")} />
                                        <h6 style={{ flex: 1, marginLeft: "12px", fontWeight: "400" }}>Credit Card</h6>
                                        <input
                                            ref={credit}
                                            type="radio"
                                            name="paymentMethod"
                                            className={cx("paymentInput")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={cx("wrapper-flex")}>
                                <Link to="/" type="button" className={cx("continue-shopping")}>
                                    <UndoIcon className={cx("undo-icon")} />
                                    Continue Shopping
                                </Link>
                                {/* submit */}
                                <Button type="submit" className={cx("confirm-payment")}>
                                    Confirm
                                    <ArrowNextIcon className={cx("arrowNext-icon")} />
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className={cx("order-summary")}>
                <h2>Order Summary</h2>
                {listCart && listCart.length > 0 ? (
                    <div style={{ maxHeight: "256px", overflowY: "scroll" }}>
                        <CartItem listCart={listCart} />
                    </div>
                ) : (
                    <div className={cx("order-isEmpty")}>
                        <BagGreyIcon />
                        <h2>No Item Added Yet!</h2>
                    </div>
                )}
                <div className={cx("coupon-code")}>
                    <input
                        type="text"
                        name="couponCode"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Input your coupon code"
                        className={cx("input-coupon")}
                    />
                    <Button
                        onClick={() => {
                            listCoupon.map((coupon) => {
                                if (coupon === couponCode) {
                                    return "Success!"
                                }
                                toast.error("Please Input a Valid Coupon", {
                                    duration: 3000,
                                    position: "bottom-left",
                                })
                            })
                        }}
                        className={cx("btn-coupon")}>
                        Apply
                    </Button>
                </div>
                <div className={cx("wrapper-flex")} style={{ padding: "8px 0" }}>
                    <span className={cx("title-summary")}>Subtotal</span>
                    <span className={cx("price-summary")}>{priceFormat(getTotal().totalPrice)}</span>
                </div>
                <div className={cx("wrapper-flex")} style={{ padding: "8px 0" }}>
                    <span className={cx("title-summary")}>Shipping Cost</span>
                    <span className={cx("price-summary")}>{priceFormat(shippingCost)}</span>
                </div>
                <div className={cx("wrapper-flex")} style={{ padding: "8px 0" }}>
                    <span className={cx("title-summary")}>Discount</span>
                    <span style={{ color: "#fb923c", fontSize: "1.4rem", fontWeight: "700" }}>$0.00</span>
                </div>
                <div
                    className={cx("wrapper-flex")}
                    style={{ paddingTop: "20px", marginTop: "16px", borderTop: "1px solid var(--border-color)" }}>
                    <span className={cx("total-cost")}>TOTAL COST</span>
                    <span className={cx("total-price")}>
                        {priceFormat(getTotal().totalPrice + Number(shippingCost))}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Checkout
