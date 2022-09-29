import React, { useRef, useState } from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"

import classNames from "classnames/bind"
import styles from "./Checkout.module.scss"
import InputField from "~/components/InputField"
import { Grid } from "@mui/material"
import CartItem from "~/components/CartItem"
import { useSelector } from "react-redux"
import Button from "~/components/Button"
import priceFormat from "~/utils/priceFormat"
import toast, { Toaster } from "react-hot-toast"
import { BagGreyIcon } from "~/components/Icons"
import PaymentInputs from "~/components/PaymentInputs"

const cx = classNames.bind(styles)

const Checkout = () => {
    const { listCart } = useSelector((state) => state.cart)
    const [shippingCost, setShippingCost] = useState(0)
    const [couponCode, setCouponCode] = useState("")
    const fedExRef = useRef()
    const upsRef = useRef()

    const initialValues = {
        email: "",
        password: "",
    }

    // const validationSchema = Yup.object({
    //     email: Yup.string().email("Must be a valid email").required("Please Enter your Email"),
    //     password: Yup.string()
    //         .min(6, "Must be between 6 and 50 characters")
    //         .max(50, "Must be between 6 and 50 characters")
    //         .required("Please Enter your Password"),
    // })

    // const onSubmit = async (values) => {
    //     try {
    //         const res = await signInWithEmailAndPassword(auth, values.email, values.password)
    //         console.log("res", res)
    //         toast.success("Login Success!", {
    //             duration: 3000,
    //             position: "bottom-right",
    //         })
    //     } catch (err) {
    //         console.error("err", err.message)
    //         toast.error(err.message, {
    //             duration: 3000,
    //             position: "bottom-right",
    //         })
    //         if (err.code === "auth/user-not-found") {
    //             return err.status(400).json({
    //                 message: console.log("User not found"),
    //             })
    //         } else {
    //             return err.status(500).json({
    //                 message: console.log("Something went wrong, Please try again later"),
    //             })
    //         }
    //     }
    // }

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
        <Grid container justifyContent="space-between" className={cx("checkout-bg")}>
            <Grid laptop={7} tablet={6} smTablet={12} mobile={12} smMobile={12} className={cx("checkout-card")}>
                <Formik
                // initialValues={initialValues}
                // validationSchema={validationSchema}
                // onSubmit={onSubmit}
                >
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
                                            display="flex"
                                            laptop={6}
                                            tablet={6}
                                            className={cx("cost-card")}
                                            onClick={() => {
                                                fedExRef.current.click()
                                                setShippingCost(fedExRef.current.value)
                                            }}>
                                            <div>
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
                                            display="flex"
                                            laptop={6}
                                            tablet={6}
                                            className={cx("cost-card")}
                                            onClick={() => {
                                                upsRef.current.click()
                                                setShippingCost(upsRef.current.value)
                                            }}>
                                            <div>
                                                <h6>UPS</h6>
                                                <p>Delivery: Today Cost : $20.00</p>
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
                                <PaymentInputs />
                                <div className={cx("wrapper-flex")}>
                                    <div>
                                        <h6>Cash On Delivery</h6>
                                        <input type="radio" name="delivery" className={cx("form-inputPayment")} />
                                    </div>
                                    <div>
                                        <h6>Credit Card</h6>
                                        <input type="radio" name="card" className={cx("form-inputPayment")} />
                                    </div>
                                </div>
                            </div>

                            <button type="button" className={cx("continue-shopping")}>
                                Continue Shopping
                            </button>
                            {/* submit */}
                            <button type="submit" className={cx("confirm-payment")}>
                                Confirm
                            </button>
                        </Form>
                    )}
                </Formik>
            </Grid>
            <Grid
                display="flex"
                flexDirection="column"
                laptop={5}
                tablet={6}
                smTablet={12}
                mobile={12}
                smMobile={12}
                className={cx("order-summary")}>
                <h2>Order Summary</h2>
                {listCart && listCart.length > 0 ? (
                    <CartItem listCart={listCart} />
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
                        }}>
                        Apply
                    </Button>
                </div>
                <div className={cx("wrapper-flex")}>
                    <span>Subtotal</span>
                    <span>{priceFormat(getTotal().totalPrice)}</span>
                </div>
                <div className={cx("wrapper-flex")}>
                    <span>Shipping Cost</span>
                    <span>{priceFormat(shippingCost)}</span>
                </div>
                <div className={cx("wrapper-flex")}>
                    <span>Discount</span>
                    <span style={{ color: "#fb923c" }}>$0.00</span>
                </div>
                <div className={cx("wrapper-flex")}>
                    <span>TOTAL COST</span>
                    <span>{priceFormat(getTotal().totalPrice + Number(shippingCost))}</span>
                </div>
            </Grid>
            <Toaster reverseOrder />
        </Grid>
    )
}

export default Checkout
