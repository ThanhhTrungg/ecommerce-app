import React from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import * as userActions from "~/redux/userSlice"
import InputField from "~/components/InputField"
import UserApi from "~/api/UserApi"
import { EnvelopeIcon, FBIcon, GGIcon } from "~/components/Icons"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "~/firebase"

import classNames from "classnames/bind"
import styles from "./ForgotModal.module.scss"
import toast from "react-hot-toast"

const cx = classNames.bind(styles)

const ForgotModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        email: "",
    }

    // const validationSchema = Yup.object({
    //     email: Yup.string().email("Must be a valid email").required("Please Enter your Email"),
    // })

    const onSubmit = async (values) => {
        try {
            await sendPasswordResetEmail(auth, values.email)
            toast.success("Password reset link sent!", {
                duration: 3000,
                position: "bottom-right",
            })
        } catch (err) {
            console.error(err)
            alert(err.message)
        }

        // try {
        //     // call api
        //     const result = await UserApi.signin(values.email, values.password)
        //     console.log(result)
        //     // redirect to home page
        //     navigate("/")
        // } catch (error) {
        //     console.log(error)
        //     if (error.status === 401) {
        //         // show error notification
        //         toast.error("Wrong Username or Password!", {
        //             duration: 3000,
        //             position: "bottom-right",
        //         })
        //     } else if (error.status === 404) {
        //         // redirect page error server
        //         navigate("/notfound")
        //     }
        // }
    }

    return (
        <>
            <div className={cx("login-title")}>
                <h1>Forget Password</h1>
                <p>Reset Your Password</p>
            </div>
            <div className={cx("login-background")}>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {() => (
                        <Form className={cx("form-login")}>
                            <InputField
                                label="Email"
                                type="text"
                                name="email"
                                placeholder="Email"
                                icon={<EnvelopeIcon className={cx("form-icon")} />}
                                className={cx("form-email")}
                            />

                            {/* Remember me */}
                            <div className={cx("rememberORForgot")}>
                                <Link className={cx("forgotPass")} to="/">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* submit */}
                            <button type="submit" className={cx("login-btn")}>
                                Recover Password
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className={cx("different-login")}>
                    <span>OR</span>
                </div>
                <div className={cx("different-list")}>
                    <button className={cx("btn-fb")}>
                        <FBIcon className={cx("btn-login-icon")} />
                        <span>Login With Facebook</span>
                    </button>

                    <button className={cx("btn-gg")}>
                        <GGIcon className={cx("btn-login-gg")} />
                        <span>Login With Google</span>
                    </button>
                </div>

                <div className={cx("form-note")}>
                    <span>Not have a account ?</span>
                    <button
                        className={cx("signup-navigate")}
                        onClick={() => {
                            dispatch(userActions.setOpenSignUpModal(true))
                            dispatch(userActions.setOpenForgotModal(false))
                        }}>
                        Register
                    </button>
                </div>
            </div>
        </>
    )
}

export default ForgotModal
