import React from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import * as userActions from "~/redux/userSlice"
import InputField from "~/components/InputField"
import UserApi from "~/api/UserApi"
import toast from "react-hot-toast"
import storage from "~/Storage/Storage"
import { EnvelopeIcon, FBIcon, GGIcon, LockIcon } from "../Icons"
import { signInWithGoogle } from "~/firebase"

import classNames from "classnames/bind"
import styles from "./LoginModal.module.scss"

const cx = classNames.bind(styles)

const LoginModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [checkedRememberMe, setCheckedRememberMe] = React.useState(storage.isRememberMe())

    const initialValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        // email: Yup.string().email("Must be a valid email").required("Please Enter your Email"),
        password: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Please Enter your Password"),
    })

    const onSubmit = async (values) => {
        try {
            // call api
            const result = await UserApi.login(values.email, values.password)
            console.log(result)

            // check user active
            if (result.token === null || result.token === undefined) {
            } else {
                // set remember me
                storage.setRememberMe(checkedRememberMe)

                // save token & UserInfo to storage
                storage.setToken(result.token)
                storage.setUserInfo(result.userName, result.email, result.role, result.status)

                // save token & UserInfo to redux
                // props.userSlice.setTokenInfo(result.token)
                // props.userSlice.setUserLoginInfo(
                //     result.userName,
                //     result.email,
                //     result.firstName,
                //     result.lastName,
                //     result.role,
                //     result.status
                // )

                dispatch(userActions.setOpenLoginModal(false))
                toast.success("Login Success!", {
                    duration: 3000,
                    position: "top-center",
                })
            }
        } catch (error) {
            if (error.status === 400) {
                // show error notification
                toast.error(error.data, {
                    duration: 3000,
                    position: "bottom-right",
                })
            } else if (error.status === 404) {
                // redirect page error server
                navigate("/notfound")
            }
        }
    }

    return (
        <>
            <div className={cx("login-title")}>
                <h1>Login</h1>
                <p>Login with your email and password</p>
            </div>
            <div className={cx("login-background")}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                icon={<LockIcon className={cx("form-icon")} />}
                                className={cx("form-password")}
                            />

                            {/* Remember me */}
                            <div className={cx("rememberORForgot")}>
                                <div className={cx("rememberMe")}>
                                    <input id="rememberMe" type="checkbox" />
                                    <label
                                        htmlFor="rememberMe"
                                        defaultChecked={checkedRememberMe}
                                        onChange={() => setCheckedRememberMe(!checkedRememberMe)}>
                                        Remember me
                                    </label>
                                </div>

                                <button
                                    type="button"
                                    className={cx("forgotPass")}
                                    onClick={() => {
                                        dispatch(userActions.setOpenForgotModal(true))
                                        dispatch(userActions.setOpenLoginModal(false))
                                    }}>
                                    Forgot password?
                                </button>
                            </div>

                            {/* submit */}
                            <button type="submit" className={cx("login-btn")}>
                                Log in
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

                    <button className={cx("btn-gg")} onClick={signInWithGoogle}>
                        <GGIcon className={cx("btn-login-gg")} />
                        <span>Login With Google</span>
                    </button>
                </div>

                <div className={cx("form-note")}>
                    <span>Not have an Account?</span>
                    <button
                        className={cx("signup-navigate")}
                        onClick={() => {
                            dispatch(userActions.setOpenSignUpModal(true))
                            dispatch(userActions.setOpenLoginModal(false))
                        }}>
                        Register
                    </button>
                </div>
            </div>
        </>
    )
}

export default LoginModal
