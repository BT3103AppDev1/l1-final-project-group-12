import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "./firebase-config";

/**
 * Tries to sign up a new user using the provided details (async)
 * @param {string} phoneNumber new user's phoneNumber
 * @param {string} telegramHandle new user's telegramHandle
 * @param {string} email new user's email
 * @param {string} password new user's password
 */
async function signUp(name, phoneNumber, telegramHandle, email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      name, phoneNumber, telegramHandle, email,
    })

    return userCred;
  } catch (error) {
    console.error("ERROR: failed to sign up new user", error);
  }
}
/**
 * Tries to sign in an existing user using the provided details (async)
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
 * Tries to sign out the current user (async)
 */
async function logOut() {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("ERROR: failed to sign out user", error);
  }
}

export { signUp, signIn, logOut };
