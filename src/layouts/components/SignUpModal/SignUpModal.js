import React from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import * as userActions from "~/redux/userSlice"
import InputField from "~/components/InputField"
import UserApi from "~/api/UserApi"
import toast from "react-hot-toast"

import classNames from "classnames/bind"
import styles from "./SignUpModal.module.scss"
import { EnvelopeIcon, FBIcon, GGIcon, LockIcon, UserIcon } from "../../../components/Icons"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import { auth, db } from "~/firebase"

const cx = classNames.bind(styles)

const SignUpModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            // .test("checkExistsUsername", "This username is already registered.", async (username) => {
            //     // call api
            //     const isExists = await UserApi.existsUserByUserName(username)
            //     return !isExists
            // })
            .required("Required"),
        email: Yup.string().email("Email is invalid").required("Required"),
        // .test("checkExistsEmail", "This email is already registered.", async (email) => {
        //     // call api
        //     const isExists = await UserApi.existsUserByEmail(email)
        //     return !isExists
        // })
        password: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password must match")
            .required("Required"),
    })

    const registerWithEmailAndPassword = async (values) => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password,
                values.confirmPassword
            )
            const user = res.user
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: values.username,
                authProvider: "local",
                email: values.email,
            })
            dispatch(userActions.setOpenSignUpModal(false))
            dispatch(userActions.setOpenLoginModal(true))
            toast.success("Register Success!", {
                duration: 3000,
                position: "top-center",
            })
        } catch (err) {
            toast.error(err.message, {
                duration: 3000,
                position: "bottom-right",
            })
            if (err.code === "auth/email-already-in-use") {
                return err.status(400).json({
                    message: console.log("Email already taken!"),
                })
            } else {
                return err.status(500).json({
                    message: console.log("Something went wrong, Please try again later"),
                })
            }
        }
    }

    return (
        <>
            <div className={cx("login-title")}>
                <h1>Signing Up</h1>
                <p>Create an account with email</p>
            </div>

            <div className={cx("login-background")}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={true}
                    onSubmit={registerWithEmailAndPassword}>
                    {() => (
                        <Form className={cx("form-login")}>
                            <InputField
                                label="Name"
                                type="text"
                                name="username"
                                placeholder="User Name"
                                icon={<UserIcon className={cx("form-icon")} />}
                                className={cx("form-username")}
                            />

                            <InputField
                                label="Email"
                                type="text"
                                name="email"
                                placeholder="Email"
                                icon={<EnvelopeIcon className={cx("form-icon")} />}
                                className={cx("form-email")}
                            />

                            <div style={{ display: "flex" }}>
                                <InputField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    icon={<LockIcon className={cx("form-icon")} />}
                                    className={cx("form-password")}
                                />

                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    icon={<LockIcon className={cx("form-icon")} />}
                                    className={cx("form-password")}
                                />
                            </div>

                            {/* Remember me */}
                            <div className={cx("rememberORForgot")}>
                                <button
                                    type="button"
                                    className={cx("forgotPass")}
                                    onClick={() => {
                                        dispatch(userActions.setOpenForgotModal(true))
                                        dispatch(userActions.setOpenSignUpModal(false))
                                    }}>
                                    Forgot password?
                                </button>
                            </div>

                            {/* submit */}
                            <button type="submit" className={cx("login-btn")}>
                                Register
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
                    <span>Already have a account?</span>
                    <button
                        to="/signup"
                        className={cx("signup-navigate")}
                        onClick={() => {
                            dispatch(userActions.setOpenLoginModal(true))
                            dispatch(userActions.setOpenSignUpModal(false))
                        }}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignUpModal
