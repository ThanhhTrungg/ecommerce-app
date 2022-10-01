import React from "react"
import { auth } from "~/firebase"
import { useDispatch } from "react-redux"
import * as userActions from "~/redux/userSlice"

const LoginModal = () => {
    const dispatch = useDispatch()
    return dispatch(userActions.setOpenLoginModal(true))
}

const withAuth = (AuthenticatedComponent) =>
    function ({ isAuthenticated, ...props }) {
        isAuthenticated = () => {
            const user = auth.currentUser
            if (user !== null && user !== undefined) {
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    uid: user.uid,
                }
                console.log("userInfo", userInfo)
                return userInfo
            }
        }

        return !isAuthenticated ? <LoginModal /> : <AuthenticatedComponent {...props} />
    }

export default withAuth
