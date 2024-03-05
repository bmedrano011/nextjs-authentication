import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbmhzEeZGVE8iyZTswf0FGxvdiD5MPej0",
  authDomain: "nextjs-authentication-de-7193d.firebaseapp.com",
  projectId: "nextjs-authentication-de-7193d",
  storageBucket: "nextjs-authentication-de-7193d.appspot.com",
  messagingSenderId: "234386137987",
  appId: "1:234386137987:web:e0d279e460202355730cb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
