// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuORAsxQgvyvI_QvqwvrDfYEJAQkMP4jw",
  authDomain: "snapgarm.firebaseapp.com",
  projectId: "snapgarm",
  storageBucket: "snapgarm.appspot.com",
  messagingSenderId: "322689735138",
  appId: "1:322689735138:web:d293a44f4698f18c8801bb",
  measurementId: "G-1SZ5LZVJEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);

export {app,auth,firestore,storage};