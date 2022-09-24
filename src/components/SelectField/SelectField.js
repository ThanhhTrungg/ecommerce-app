import React from "react"
import classNames from "classnames/bind"
import styles from "./SelectField.module.scss"
import { ErrorMessage, Field } from "formik"

const cx = classNames.bind(styles)

const SelectField = ({ label, name, options, children, ...props }) => {
    return (
        <div className={cx("form-control")}>
            {label && <label htmlFor={name}>{label}</label>}
            <Field as="select" id={name} name={name} {...props}>
                {children}
                {options.map((option) => (
                    <option className={cx("option")} key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </Field>
            <ErrorMessage name={name} component="div" className={cx("error")} />
        </div>
    )
}

export default SelectField
