import React from "react"
import classNames from "classnames/bind"
import styles from "./InputField.module.scss"
import { ErrorMessage, Field, useField } from "formik"
const cx = classNames.bind(styles)

const InputField = ({ label, icon, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div style={{ position: "relative", marginBottom: "20px" }}>
            {label && (
                <label htmlFor={field.name} className={cx("field-label")}>
                    {label}
                </label>
            )}
            {icon && <span className={cx("field-icon")}>{icon}</span>}
            <Field as="input" className={`${meta.touched && meta.error && "is-invalid"}`} {...field} {...props} />
            <ErrorMessage name={field.name} component="div" className={cx("error")} />
        </div>
    )
}

export default InputField
