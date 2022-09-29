import React from "react"
import { Drawer } from "@mui/material"

import classNames from "classnames/bind"
const DrawerWrapper = ({ children, isOpen, handleClose, anchor, key }) => {
    return (
        <Drawer
            style={{ maxWidth: "100vw" }}
            PaperProps={{ sx: { width: "420px", display: "flex", justifyContent: "space-between" } }}
            className={classNames("cart-drawer")}
            open={isOpen}
            onClose={handleClose}
            anchor={anchor}
            transitionDuration={350}>
            {children}
        </Drawer>
    )
}

export default DrawerWrapper
