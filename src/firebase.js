// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth"
import { getFirestore, getStorage, ref, getDownloadURL } from "firebase/firestore"

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

export { auth, db, googleProvider, logout }
