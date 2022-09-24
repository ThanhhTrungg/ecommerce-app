import React from "react"
import { useDispatch, useSelector } from "react-redux"
import LoginModal from "~/components/LoginModal"
import SignUpModal from "~/components/SignUpModal"
import ForgotModal from "~/components/ForgotModal"
import { Modal, Backdrop, Fade, Box } from "@mui/material"
import * as userActions from "~/redux/userSlice"

import classNames from "classnames/bind"
import styles from "./ModalComp.module.scss"
const cx = classNames.bind(styles)

const ModalComp = () => {
    const dispatch = useDispatch()
    const { openLoginModal, openSignUpModal, openForgotModal } = useSelector((state) => state.user)

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        borderRadius: 3.75,
        textAlign: "center",
        p: 5,
    }

    return (
        <>
            <Modal
                open={openLoginModal || openSignUpModal || openForgotModal}
                onClose={() => {
                    dispatch(userActions.setOpenLoginModal(false))
                    dispatch(userActions.setOpenSignUpModal(false))
                    dispatch(userActions.setOpenForgotModal(false))
                }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={openLoginModal || openSignUpModal || openForgotModal}>
                    <Box sx={style} className={cx("modal")}>
                        {(openLoginModal && <LoginModal openLoginModal={openLoginModal} />) ||
                            (openForgotModal && <ForgotModal openForgotModal={openForgotModal} />) ||
                            (openSignUpModal && <SignUpModal openSignUpModal={openSignUpModal} />)}
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ModalComp
