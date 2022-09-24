import React from "react"
import classNames from "classnames/bind"
import styles from "./Button.module.scss"

const cx = classNames.bind(styles)

const Button = ({
    children,
    to,
    href,
    className,
    onClick,
    leftIcon,
    rightIcon,
    primary = false,
    text = false,
    small = false,
    large = false,
    ...passProps
}) => {
    let Comp = "button"
    const props = { onClick, ...passProps }
    if (to) {
        props.to = to
    } else if (href) {
        props.href = href
        Comp = "a"
    }
    const classes = cx("wrapper", { [className]: className, primary, text, small, large })

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
            {children && <span className={cx("title")}>{children}</span>}
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Comp>
    )
}

export default Button
