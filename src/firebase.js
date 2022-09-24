// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

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
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((response) => {
            const googleUser = {
                name: response.user.displayName,
                email: response.user.email,
                profilePic: response.user.photoURL,
            }
            localStorage.setItem("googleUser", JSON.stringify(googleUser))
        })
        .catch((error) => console.log(error))
}
