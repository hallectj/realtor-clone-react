// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXxLhgsw1kjcxjD-CIQe0G_XbRiegf6oI",
  authDomain: "realtor-clone-react-7e768.firebaseapp.com",
  projectId: "realtor-clone-react-7e768",
  storageBucket: "realtor-clone-react-7e768.appspot.com",
  messagingSenderId: "174719155239",
  appId: "1:174719155239:web:cc6fd07a0d57d77d5ea202"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);