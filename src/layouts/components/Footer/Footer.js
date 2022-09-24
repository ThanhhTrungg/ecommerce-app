import { Divider, Grid } from "@mui/material"
import React from "react"
import {
    CallUsIcon,
    CircleFBIcon,
    FreeShipIcon,
    GiftIcon,
    LinkedinIcon,
    PaymentIcon,
    PinterestIcon,
    TweeterIcon,
    WhatsappIcon,
} from "~/components/Icons"
import Image from "~/components/Image"

import classNames from "classnames/bind"
import styles from "./Footer.module.scss"
import Button from "~/components/Button"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(styles)

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer>
            <Grid
                container
                sx={{
                    display: { tablet: "none", smTablet: "none", mobile: "none", smMobile: "none", laptop: "flex" },
                }}
                alignItems="center"
                justifyContent="space-between"
                className={cx("footer-top")}>
                <Grid laptop={3} className={cx("top-item")}>
                    <FreeShipIcon className={cx("top-icon")} />
                    Free Shipping From $500.00
                </Grid>

                <Grid laptop={3} className={cx("top-item")}>
                    <CallUsIcon className={cx("top-icon")} />
                    Support 24/7 At Anytime
                </Grid>

                <Grid laptop={3} className={cx("top-item")}>
                    <PaymentIcon className={cx("top-icon")} />
                    Secure Payment Totally Safe
                </Grid>

                <Grid laptop={3} className={cx("top-item")}>
                    <GiftIcon className={cx("top-icon")} />
                    Latest Offer Upto 20% Off
                </Grid>
            </Grid>
            <Divider />
            <div className={cx("footer-content")}>
                <Grid container alignItems="center" justifyContent="space-between" className={cx("footer-middle")}>
                    <Grid laptop={3} tablet={6} smTablet={4} mobile={6} smMobile={6} className={cx("middle-item")}>
                        <h3>Company</h3>
                        <span>About Us</span>
                        <span>Contact us</span>
                        <span>Careers</span>
                        <span>Latest news</span>
                    </Grid>

                    <Grid laptop={3} tablet={6} smTablet={4} mobile={6} smMobile={6} className={cx("middle-item")}>
                        <h3>Top Category</h3>
                        <span>Category 1</span>
                        <span>Category 2</span>
                        <span>Category 3</span>
                        <span>Category 4</span>
                    </Grid>

                    <Grid laptop={3} tablet={6} smTablet={4} mobile={6} smMobile={6} className={cx("middle-item")}>
                        <h3>My Account</h3>
                        <span>Dashboard</span>
                        <span>My Orders</span>
                        <span>Recent Orders</span>
                        <span>Updated Profile</span>
                    </Grid>

                    <Grid laptop={3} tablet={6} mobile={6} smMobile={6} className={cx("middle-item")}>
                        <Button className={cx("middle-link")} onClick={() => navigate("/")}>
                            <Image
                                src="https://multikart-react.vercel.app/assets/images/icon/logo.png"
                                alt="logo"
                                className={cx("middle-img")}
                            />
                        </Button>
                        <span>987 Andre Plain Suite High Street 838,</span>
                        <span>Lake Hestertown, USA</span>
                        <span>Tell: 02.356.1666</span>
                        <span>Email: ccruidk@test.com</span>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container alignItems="center" justifyContent="space-between" className={cx("footer-bottom")}>
                    <Grid laptop={4} tablet={4} smTablet={12} className={cx("bottom-item")}>
                        <span>Follow Us</span>
                        <CircleFBIcon className={cx("bottom-icon")} />
                        <TweeterIcon className={cx("bottom-icon")} />
                        <PinterestIcon className={cx("bottom-icon")} />
                        <LinkedinIcon className={cx("bottom-icon")} />
                        <WhatsappIcon className={cx("bottom-icon")} />
                    </Grid>
                    <Grid
                        laptop={4}
                        tablet={4}
                        sx={{
                            display: {
                                laptop: "block",
                                tablet: "block",
                                smTablet: "none",
                                mobile: "none",
                                smMobile: "none",
                            },
                        }}
                        className={cx("bottom-item")}>
                        <span>Call Us Today!</span>
                        <h5>+01234567890</h5>
                    </Grid>
                    <Grid
                        laptop={4}
                        tablet={4}
                        sx={{
                            display: {
                                laptop: "block",
                                tablet: "block",
                                smTablet: "none",
                                mobile: "none",
                                smMobile: "none",
                            },
                        }}
                        className={cx("bottom-item")}>
                        <Image
                            src="https://kachabazar-store.vercel.app/_next/image?url=%2Fpayment-method%2Fpayment-logo.png&w=384&q=75"
                            alt="payment"
                            className={cx("bottom-img")}
                        />
                    </Grid>
                </Grid>
            </div>

            <div className={cx("copyright")}>
                Copyright 2022 @ <span>By Me</span>, All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
