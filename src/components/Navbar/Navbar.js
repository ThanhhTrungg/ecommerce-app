import React, { useState } from "react"
import { Grid, Box, Popper, ClickAwayListener, Fade, styled } from "@mui/material"

import Button from "../Button"
import {
    ArrowDownIcon,
    ExclamationIcon,
    FileIcon,
    GiftIcon,
    GroupIcon,
    InCallIcon,
    QuestionIcon,
    ShieldIcon,
    TickBagIcon,
} from "../Icons"
import { useSelector } from "react-redux"
import { Wrapper as PopperWrapper } from "~/components/Popper"
import { useScrollY } from "~/hooks"

import classNames from "classnames/bind"
import styles from "./Navbar.module.scss"
import CategoriesDropdown from "../CategoriesDropdown"
import Loading from "../Loading"
const cx = classNames.bind(styles)

const pageMenu = [
    {
        icon: <GiftIcon />,
        title: "Offer",
        to: "/offer",
    },
    {
        icon: <TickBagIcon />,
        title: "Checkout",
        to: "/checkout",
    },
    {
        icon: <QuestionIcon />,
        title: "FAQ",
        to: "/faq",
    },
    {
        icon: <GroupIcon />,
        title: "About Us",
        to: "/about-us",
    },
    {
        icon: <InCallIcon />,
        title: "Contact us",
        to: "/contact-us",
    },
    {
        icon: <ShieldIcon />,
        title: "Privacy Policy",
        to: "/privacy-policy",
    },
    {
        icon: <FileIcon />,
        title: "Term & Conditions",
        to: "/term-and-conditions",
    },
    {
        icon: <ExclamationIcon />,
        title: "404",
        to: "/404",
    },
]

export const ButtonPage = styled("button")({})
export const CategoriesResult = styled("div")({})

const Navbar = () => {
    const scrollY = useScrollY()
    const [showListCategory, setShowListCategory] = useState(false)
    const [showListPages, setShowListPages] = useState(false)
    const { listCategories } = useSelector((state) => state.category)

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ display: { smMobile: "none", mobile: "none", smTablet: "none", tablet: "none", laptop: "flex" } }}
            className={cx("nav")}
            px={5}
            style={
                scrollY > 50
                    ? {
                          position: "fixed",
                          top: "78px",
                          zIndex: "10",
                          width: "100%",
                          transition: "all 0.3s linear",
                      }
                    : {}
            }>
            <Box className={cx("nav-menu")}>
                <Button
                    className={cx("nav-btn")}
                    rightIcon={<ArrowDownIcon className={cx("arrowDown-icon")} />}
                    onClick={(e) => setShowListCategory(showListCategory ? false : e.currentTarget)}>
                    Categories
                </Button>
                <Popper
                    style={{ zIndex: "10" }}
                    disablePortal
                    open={showListCategory && listCategories.length > 0}
                    anchorEl={showListCategory}
                    placement="bottom-start"
                    children={({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <ClickAwayListener onClickAway={() => setShowListCategory(false)}>
                                <CategoriesResult className={cx("categories-result")}>
                                    <PopperWrapper>
                                        <CategoriesDropdown categories={listCategories} icon />
                                    </PopperWrapper>
                                </CategoriesResult>
                            </ClickAwayListener>
                        </Fade>
                    )}
                />
                <Button className={cx("nav-btn")}>About Us</Button>
                <Button className={cx("nav-btn")}>Contact Us</Button>
                <Button
                    className={cx("nav-btn")}
                    rightIcon={<ArrowDownIcon className={cx("arrowDown-icon")} />}
                    onClick={(e) => setShowListPages(e.currentTarget)}>
                    Pages
                </Button>
                <Popper
                    style={{ zIndex: "10" }}
                    disablePortal
                    open={showListPages && pageMenu.length > 0}
                    anchorEl={showListPages}
                    placement="bottom-start"
                    children={({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <ClickAwayListener onClickAway={() => setShowListPages(false)}>
                                <div className={cx("page-result")}>
                                    <PopperWrapper>
                                        {/* {pageMenu.map((menu, index) => (
                                            <ButtonPage key={index}>
                                                <span>{menu.icon}</span>
                                                <span>{menu.title}</span>
                                            </ButtonPage>
                                        ))} */}
                                        <Loading />
                                    </PopperWrapper>
                                </div>
                            </ClickAwayListener>
                        </Fade>
                    )}
                />
                <Button className={cx("nav-btn", "offers-btn")}>
                    Offers
                    <span className={cx("ping-dot")}></span>
                </Button>
            </Box>
            <Box className={cx("nav-policy")}>
                <Button className={cx("policy-btn")}>Privacy Policy</Button>
                <Button className={cx("term-btn")}>Terms & Conditions</Button>
            </Box>
        </Grid>
    )
}

export default Navbar
