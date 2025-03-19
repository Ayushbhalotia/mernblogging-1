// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsWAWITG9vRUsGhqgH8p2J8OktQQJQ5HQ",
  authDomain: "react-js-blog-website-bf9c9.firebaseapp.com",
  projectId: "react-js-blog-website-bf9c9",
  storageBucket: "react-js-blog-website-bf9c9.firebasestorage.app",
  messagingSenderId: "350566312861",
  appId: "1:350566312861:web:c2f0996afca8f942891d74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () =>{
    let user= null;

    await signInWithPopup(auth,provider)
    .then((result)=>{
        user = result.user
    })
.catch((err)=>{
    console.log(err)
})


    return user;
}