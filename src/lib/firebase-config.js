import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAqMBVoD2lH1fp28fAOU0K6LrKJQNbzlUs",
  authDomain: "tent-app-14897.firebaseapp.com",
  projectId: "tent-app-14897",
  storageBucket: "tent-app-14897.appspot.com",
  messagingSenderId: "1075366007831",
  appId: "1:1075366007831:web:fda8ef43334b5b49597852",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };