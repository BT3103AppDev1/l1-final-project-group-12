import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../firebase-config";

/**
 * Try to sign up a new user
 * @param {string} email new user's email
 * @param {string} password new user's password
 * @param {string} phoneNumber new user's phoneNumber
 * @param {string} telegramHandle new user's telegramHandle
 */
async function signUp(email, password, phoneNumber, telegramHandle) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      id: userCred.user.uid,
      phoneNumber,
      telegramHandle,
      email,
      isTutor: false,
      gender: "",
      education: "",
      experience: 0,
      levels: [],
      subjects: [],
      region: "",
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

/**
 * Try to get current user
 */
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

export { signUp, signIn, logOut, getCurrentUser };
