import React from "react"
import classNames from "classnames/bind"
import styles from "./HomeSlide.module.scss"
import { Box, Grid } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper"
import Image from "../Image"
import Button from "../Button"

const cx = classNames.bind(styles)

const HomeSlide = () => {
    return (
        <Grid container className={cx("slide-background")}>
            <Grid container className={cx("content-banner")}>
                <Grid
                    tablet={12}
                    laptop={12}
                    className={cx("slide-banner")}
                    // sx={{ paddingRight: { laptop: "12px", desktop: "24px" } }}
                    >
                    <Swiper
                        style={{ height: "100%" }}
                        slidesPerView={1}
                        loop={true}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination]}>
                        <SwiperSlide>
                            <Image
                                className={cx("slide-img")}
                                src="https://cf.shopee.vn/file/ac1e058f1c45a3299843d0c16d830a39"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                className={cx("slide-img")}
                                src="https://cf.shopee.vn/file/8f8234ee0b077bfd8e46a9fdad2722b6"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                className={cx("slide-img")}
                                src="https://cf.shopee.vn/file/7892fef919e1df2501da24d190cb9019"
                            />
                        </SwiperSlide>
                    </Swiper>
                </Grid>
                {/* <Grid laptop={5} sx={{ display: { smMobile: "none", mobile: "none", tablet: "none", laptop: "flex" } }}>
                    <Box className={cx("coupon-ticket")}>
                        <h3>Latest Super Discount Active Coupon Code</h3>
                        <div className={cx("coupon-body")}>
                            <Grid container className={cx("ticket-item")}>
                                <Grid>
                                    <Box className={cx("ticker-info")}>
                                        <Image
                                            src="https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F23kQcB9%2Fins3.jpg&w=128&q=75"
                                            alt="Summer gift voucher"
                                        />
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Box className={cx("discount-time")}>
                                        <Image
                                            src="https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FwBBYm7j%2Fins4.jpg&w=128&q=75"
                                            alt="Winter gift voucher"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container className={cx("ticket-item")}>
                                <Grid>
                                    <Box></Box>
                                </Grid>
                                <Grid>
                                    <Box></Box>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Grid> */}
            </Grid>
            {/* <Grid
                container
                sx={{ display: { smMobile: "none", mobile: "none", tablet: "none", laptop: "flex" } }}
                className={cx("special-product")}>
                <Box className={cx("special-box")}>
                    <div>
                        <h1>
                            <span>100% Natural Quality</span> Organic Product
                        </h1>
                        <p>
                            See Our latest discounted products from here and get a special
                            <span>discount product</span>
                        </p>
                    </div>
                    <Button>Shop Now</Button>
                </Box>
            </Grid> */}
        </Grid>
    )
}

export default HomeSlide
