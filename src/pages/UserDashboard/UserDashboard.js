import React, { useEffect, useRef, useState } from "react"
import InputField from "~/components/InputField"
import { Form, Formik } from "formik"
import toast, { Toaster } from "react-hot-toast"
import * as CategoryApi from "~/api/CategoryApi"
import * as ProductApi from "~/api/ProductApi"
import SelectField from "~/components/SelectField/SelectField"
import { useNavigate } from "react-router-dom"
import { DashBoardIcon, FileIcon, MenuBarIcon, OptionIcon, UnlockIcon, UploadCloudIcon } from "~/components/Icons"
import Button from "~/components/Button"

import classNames from "classnames/bind"
import styles from "./UserDashboard.module.scss"
import Image from "~/components/Image"
const cx = classNames.bind(styles)

const UserDashboard = () => {
    const navigate = useNavigate()
    const [allCategories, setAllCategories] = useState([])
    console.log("allCategories", allCategories)
    const [tabIndex, setTabIndex] = useState(1)
    const avatarInputFile = useRef()
    const [file, setFile] = useState()
    const [fileDataURL, setFileDataURL] = useState()

    const handleChangeAvatarInput = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    useEffect(() => {
        let fileReader,
            isCancel = false
        if (file) {
            fileReader = new FileReader()
            fileReader.onload = (e) => {
                const { result } = e.target
                result && !isCancel && setFileDataURL(result)
            }
            fileReader.readAsDataURL(file)
        }
        return () => {
            isCancel = true
            fileReader && fileReader.readyState === 1 && fileReader.abort()
        }
    }, [file])

    const handleAddCategory = async (values) => {
        try {
            const result = await CategoryApi.createCategory(values.categoryName, values.imgUrl)
            console.log(result)
            // message success
            if (result) toast.success("A new category created", { duration: 3000, position: "bottom-right" })
        } catch (error) {
            console.log(error)
            toast.error("error", { duration: 3000, position: "bottom-right" })
        }
    }

    const handleAddProduct = async (values) => {
        try {
            const result = await ProductApi.createProduct(
                values.productName,
                values.productPrice,
                values.productDes,
                values.selectOption,
                values.imgUrl
            )
            console.log(result)
            // message success
            if (result) toast.success("A new product created", { duration: 3000, position: "bottom-right" })
        } catch (error) {
            console.log(error)
            toast.error("error", { duration: 3000, position: "bottom-right" })
        }
    }

    const handleCategoryId = async () => {
        try {
            const result = await CategoryApi.listCategory()
            setAllCategories(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeProfile = async (values) => {
        try {
            const result = await ProductApi.createProduct(
                values.profileName,
                values.profileAddress,
                values.profileMobile,
                values.profileEmail
            )
            console.log(result)
            // message success
            if (result) toast.success("Profile is uploaded", { duration: 3000, position: "bottom-right" })
        } catch (error) {
            console.log(error)
            toast.error("error", { duration: 3000, position: "bottom-right" })
        }
    }

    const handleChangePassword = () => {}

    return (
        <>
            <div className={cx("dashboard-container")}>
                <div className={cx("dashboard-control")}>
                    <Button
                        leftIcon={<DashBoardIcon className={cx("dashboard-icon")} />}
                        className={cx("dashboard-actions")}
                        onClick={() => setTabIndex(1)}>
                        DashBoard
                    </Button>
                    <Button
                        leftIcon={<MenuBarIcon className={cx("dashboard-icon")} />}
                        className={cx("dashboard-actions")}
                        onClick={() => setTabIndex(2)}>
                        My Orders
                    </Button>
                    <Button
                        leftIcon={<OptionIcon className={cx("dashboard-icon")} />}
                        className={cx("dashboard-actions")}
                        onClick={() => setTabIndex(3)}>
                        Update Profile
                    </Button>
                    <Button
                        leftIcon={<FileIcon className={cx("dashboard-icon")} />}
                        className={cx("dashboard-actions")}
                        onClick={() => setTabIndex(4)}>
                        Change Password
                    </Button>
                    <Button
                        // leftIcon={<AddIcon className={cx("dashboard-icon")} />}
                        className={cx("dashboard-actions")}
                        onClick={() => setTabIndex(5)}>
                        New Category
                    </Button>

                    <Button
                        // leftIcon={<AddIcon className={cx("dashboard-icon")} />}
                        className={cx("dashboard-actions")}
                        onClick={() => {
                            handleCategoryId()
                            setTabIndex(6)
                        }}>
                        New Product
                    </Button>
                    <Button
                        leftIcon={<UnlockIcon className={cx("dashboard-icon")} />}
                        className={cx("dashboard-actions")}
                        onClick={() => {
                            localStorage.clear()
                            navigate("/")
                        }}>
                        Logout
                    </Button>
                </div>
                <div className={cx("dashboard-content")}>
                    <div className={cx("tab-pane", `${tabIndex === 1 ? "active" : ""}`)}>
                        <div className={cx("card-header")}>
                            <h2>Dashboard</h2>
                        </div>
                        <div className={cx("card-body")}>
                            <p>
                                Hello, <strong>{localStorage.getItem("userName")}</strong> (If Not{" "}
                                <strong>{localStorage.getItem("userName")} !</strong> Logout )
                            </p>
                            <p>
                                From your account dashboard. you can easily check & view your recent orders, manage your
                                shipping and billing addresses and edit your password and account details.
                            </p>
                        </div>
                    </div>
                    <div className={cx("tab-pane", `${tabIndex === 2 ? "active" : ""}`)}>
                        <div className={cx("card-header")}>
                            <h2>My Order</h2>
                        </div>
                        <div className={cx("card-body")}>
                            <p>
                                Hello, <strong>{localStorage.getItem("userName")}</strong> (If Not{" "}
                                <strong>{localStorage.getItem("userName")} !</strong> Logout )
                            </p>
                            <p>
                                From your account dashboard. you can easily check & view your recent orders, manage your
                                shipping and billing addresses and edit your password and account details.
                            </p>
                        </div>
                    </div>

                    <div className={cx("tab-pane", `${tabIndex === 3 ? "active" : ""}`)}>
                        <div className={cx("card-header")}>
                            <h2>Update Profile</h2>
                        </div>
                        <div className={cx("card-body")}>
                            <div className={cx("body-uploadAvatar")}>
                                <label className={cx("avatar-label")} htmlFor="file">
                                    Photo
                                </label>
                                <div className={cx("area-upload")} onClick={() => avatarInputFile.current.click()}>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: "none" }}
                                        ref={avatarInputFile}
                                        onChange={handleChangeAvatarInput}
                                    />
                                    <span>
                                        <UploadCloudIcon className={cx("upload-icon")} />
                                    </span>
                                    <p>Drag your image here</p>
                                    <em>(Only *.jpeg and *.png images will be accepted)</em>
                                </div>
                                {fileDataURL && (
                                    <aside className={cx("area-avatar")}>
                                        <Image src={fileDataURL} alt="avatar" className={cx("avatar")} />
                                    </aside>
                                )}
                            </div>
                            <Formik
                                initialValues={{ categoryDes: "", categoryName: "", imgUrl: "" }}
                                onSubmit={handleChangeProfile}
                                validateOnChange={false}
                                validateOnBlur={false}>
                                {() => (
                                    <Form className={cx("profile-form")}>
                                        <InputField
                                            label="Full Name"
                                            name="profileName"
                                            type="text"
                                            className={cx("profile-input")}
                                        />
                                        <InputField
                                            label="Profile Address"
                                            name="profileAddress"
                                            type="text"
                                            className={cx("profile-input")}
                                        />
                                        <InputField
                                            label="Phone/Mobile"
                                            name="profileMobile"
                                            type="text"
                                            className={cx("profile-input")}
                                        />
                                        <InputField
                                            label="Email Address"
                                            name="profileEmail"
                                            type="email"
                                            className={cx("profile-input")}
                                        />
                                        <button type="submit" className={cx("profile-submit")}>
                                            Update Profile
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    <div className={cx("tab-pane", `${tabIndex === 4 ? "active" : ""}`)}>
                        <div className={cx("card-header")}>
                            <h2>Change Password</h2>
                        </div>
                        <div className={cx("card-body")}>
                            <Formik
                                initialValues={{ categoryDes: "", categoryName: "", imgUrl: "" }}
                                onSubmit={handleChangePassword}
                                validateOnChange={false}
                                validateOnBlur={false}>
                                {() => (
                                    <Form className={cx("changePassword-form")}>
                                        <InputField
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="Your Email"
                                            className={cx("changePassword-input")}
                                        />
                                        <InputField
                                            label="Current Password"
                                            name="password"
                                            type="text"
                                            placeholder="Your Current Password"
                                            className={cx("changePassword-input")}
                                        />
                                        <InputField
                                            label="New Password"
                                            name="newPassword"
                                            type="text"
                                            placeholder="Your New Password"
                                            className={cx("changePassword-input")}
                                        />
                                        <button type="submit" className={cx("changePassword-submit")}>
                                            Change Password
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    <div className={cx("tab-pane", `${tabIndex === 5 ? "active" : ""}`)}>
                        <div className={cx("card-header")}>
                            <h2>Admin Categories</h2>
                        </div>
                        <div className={cx("card-body")}>
                            <Formik
                                initialValues={{ categoryName: "", imgUrl: "" }}
                                onSubmit={handleAddCategory}
                                validateOnChange={false}
                                validateOnBlur={false}>
                                {() => (
                                    <Form className={cx("category-form")}>
                                        <InputField
                                            label="Category Name"
                                            name="categoryName"
                                            type="text"
                                            className={cx("category-input")}
                                        />
                                        {/* <InputField
                                            label="Description"
                                            name="categoryDes"
                                            type="text"
                                            className={cx("category-input")}
                                        /> */}
                                        <InputField
                                            label="ImageURL"
                                            name="imgUrl"
                                            type="text"
                                            className={cx("category-input")}
                                        />
                                        <button type="submit" className={cx("category-submit")}>
                                            Add category
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    <div className={cx("tab-pane", `${tabIndex === 6 ? "active" : ""}`)}>
                        <div className={cx("card-header")}>
                            <h2>Admin Products</h2>
                        </div>
                        <div className={cx("card-body")}>
                            <Formik
                                initialValues={{
                                    productName: "",
                                    productPrice: "",
                                    productDes: "",
                                    selectOption: "",
                                    imgUrl: "",
                                }}
                                validateOnChange={false}
                                validateOnBlur={false}
                                onSubmit={handleAddProduct}>
                                {() => (
                                    <Form className={cx("product-form")}>
                                        <SelectField
                                            className={cx("category-option")}
                                            label="Category"
                                            name="selectOption"
                                            options={allCategories}>
                                            <option selected disabled>
                                                -- Select Category --
                                            </option>
                                        </SelectField>

                                        <InputField
                                            label="Product Price"
                                            name="productPrice"
                                            type="text"
                                            className={cx("product-input")}
                                        />

                                        <InputField
                                            label="Product Name"
                                            name="productName"
                                            type="text"
                                            className={cx("product-input")}
                                        />
                                        <InputField
                                            label="Description"
                                            name="productDes"
                                            type="text"
                                            className={cx("product-input")}
                                        />
                                        <InputField
                                            label="ImageURL"
                                            name="imgUrl"
                                            type="text"
                                            className={cx("product-input")}
                                        />
                                        {/* <InputField
                                            label="Price"
                                            name="price"
                                            type="text"
                                            className={cx("product-input")}
                                        /> */}
                                        <button type="submit" className={cx("product-submit")}>
                                            Add product
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default UserDashboard
