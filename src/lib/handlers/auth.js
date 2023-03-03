import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../firebase-config";

/**
 * Try to sign up a new user
 * @param {string} phoneNumber new user's phoneNumber
 * @param {string} telegramHandle new user's telegramHandle
 * @param {string} email new user's email
 * @param {string} password new user's password
 */
async function signUp(phoneNumber, telegramHandle, email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      phoneNumber,
      telegramHandle,
      email,
      isTutor: false,
      experience: 0,
      education: "",
      levels: [],
      subjects: [],
      region: "",
      reviews: [],
    });

    return userCred;
  } catch (error) {
    console.error("ERROR: failed to sign up new user", error);
  }
}
/**
 * Try to sign in an existing user
 * @param {string} email new user's email
 * @param {string} password new user's password
 */
async function signIn(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("ERROR: failed to sign in existing user", error);
  }
}

/**
 * Try to sign out the current user
 */
async function logOut() {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("ERROR: failed to sign out user", error);
  }
}

export { signUp, signIn, logOut };
