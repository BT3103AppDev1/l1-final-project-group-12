import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu5iG_MnpSX3frBMj7eXdzjiPQMd1pcYE",
  authDomain: "bt3103-dba05.firebaseapp.com",
  projectId: "bt3103-dba05",
  storageBucket: "bt3103-dba05.appspot.com",
  messagingSenderId: "106179017194",
  appId: "1:106179017194:web:dea8e2b848bba0119a1a93",
  measurementId: "G-W0VVG1CSWC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };