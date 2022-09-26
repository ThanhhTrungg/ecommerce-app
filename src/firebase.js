// Import the functions you need from the SDKs you need
import * as userActions from "~/redux/userSlice"
import { initializeApp } from "firebase/app"
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth"
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    getStorage,
    ref,
    getDownloadURL,
} from "firebase/firestore"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

const firebaseConfig = {
    apiKey: "AIzaSyADcprS1vAkWRJL7QuemljCfyGlkTlD3Vo",
    authDomain: "ecom-thanhtrung.firebaseapp.com",
    projectId: "ecom-thanhtrung",
    storageBucket: "ecom-thanhtrung.appspot.com",
    messagingSenderId: "968066369481",
    appId: "1:968066369481:web:968f7ab507bd060041ca18",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

// Sign in Google
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            })
        }
        toast.success("Login Success!", {
            duration: 3000,
            position: "bottom-right",
        })
    } catch (err) {
        toast.error(err.message, {
            duration: 3000,
            position: "bottom-right",
        })
        if (err.code === "auth/user-not-found") {
            return err.status(400).json({
                message: console.log("User not found"),
            })
        } else {
            return err.status(500).json({
                message: console.log("Something went wrong, Please try again later"),
            })
        }
    }
}

const registerWithEmailAndPassword = async (name, email, password, confirmPassword) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password, confirmPassword)
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
        toast.success("Register Success!", {
            duration: 3000,
            position: "bottom-right",
        })
    } catch (err) {
        toast.error(err.message, {
            duration: 3000,
            position: "bottom-right",
        })
        if (err.code === "auth/email-already-in-use") {
            return err.status(400).json({
                message: console.log("Email already taken!"),
            })
        } else {
            return err.status(500).json({
                message: console.log("Something went wrong, Please try again later"),
            })
        }
    }
}

const logInWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        toast.success("Login Success!", {
            duration: 3000,
            position: "bottom-right",
        })

        
    } catch (err) {
        console.error("err", err.message)
        toast.error(err.message, {
            duration: 3000,
            position: "bottom-right",
        })
        if (err.code === "auth/user-not-found") {
            return err.status(400).json({
                message: console.log("User not found"),
            })
        } else {
            return err.status(500).json({
                message: console.log("Something went wrong, Please try again later"),
            })
        }
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        toast.success("Password reset link sent!", {
            duration: 3000,
            position: "bottom-right",
        })
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}

const logout = () => {
    signOut(auth)
}

// Storage firebase
// const storage = getStorage()
// const httpsReference = ref(
//     storage,
//     "https://lh3.googleusercontent.com/a-/AFdZucqOJ8Ena35CS0HPN9LxDuVpRgQZJN5Wh8bzmwTN=s96-c"
// )
// console.log(httpsReference)

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
}
