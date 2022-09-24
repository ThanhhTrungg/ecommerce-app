import { createSlice } from "@reduxjs/toolkit"
import storage from "../Storage/Storage"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: storage.getUserInfo(),
        token: storage.getToken(),
        openLoginModal: false,
        openSignUpModal: false,
        openForgotModal: false,
    },
    reducers: {
        setUserLoginInfo: (state, action) => {
            state.userInfo = action.payload
        }, // actions types : user/setUserLoginInfo

        setTokenInfo: (state, action) => {
            state.token = action.payload
        }, // actions types : user/setTokenInfo
        setOpenLoginModal: (state, action) => {
            state.openLoginModal = action.payload
        },
        setOpenSignUpModal: (state, action) => {
            state.openSignUpModal = action.payload
        },
        setOpenForgotModal: (state, action) => {
            state.openForgotModal = action.payload
        },
    },
})

export const { setUserLoginInfo, setTokenInfo, setOpenLoginModal, setOpenSignUpModal, setOpenForgotModal } =
    userSlice.actions

export default userSlice.reducer
