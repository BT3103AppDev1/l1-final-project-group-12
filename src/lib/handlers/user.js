import { db } from "../firebase-config";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import * as Models from "../models";

/**
 * Try to get user by id
 * @param {string} id id of the user to get
 */
async function getUserById(id) {
  try {
    const docSnap = await getDoc(doc(db, "users", id));

    if (docSnap.exists()) {
      /** @type {Models.User} */
      const userData = docSnap.data();
      return userData;
    } else {
      throw Error("user not found");
    }
  } catch (error) {
    console.error("ERROR: failed to get user by id", error);
    throw error;
  }
}

/**
 * Try to get all users
 */
async function getAllUsers() {
  try {
    const querySnap = await getDocs(collection(db, "users"));

    /** @type {Models.User[]} */
    let users = [];

    querySnap.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  } catch (error) {
    console.error("ERROR: failed to get all users", error);
    throw error;
  }
}

/**
 * Try to get all tutors (users with `isTutor == true`)
 */
async function getAllTutors() {
  try {
    const querySnap = await getDocs(query(collection(db, "users"), where("isTutor", "==", true)));

    /** @type {Models.User[]} */
    let tutors = [];

    querySnap.forEach((doc) => {
      tutors.push(doc.data());
    });

    return tutors;
  } catch (error) {
    console.error("ERROR: failed to get all users", error);
    throw error;
  }
}

/**
 * Try to update user by id
 * @param {string} id id of the user to update
 * @param {object} updateFields object with fields to be updated
 * @param {string} [updateFields.phoneNumber]
 * @param {string} [updateFields.telegramHandle]
 * @param {string} [updateFields.email]
 * @example
 * // update only phoneNumber and email
 * updateUserById("123", { phoneNumber: "999", email: "hello@world.com" })
 */
async function updateUserById(id, updateFields) {
  try {
    await updateDoc(doc(db, "users", id), updateFields);
  } catch (error) {
    console.error("ERROR: failed to update user by id", error);
    throw error;
  }
}

/**
 * Try to update tutor profile by id
 * @param {string} id id of the user to update
 * @param {object} tutorProfileFields object with fields to be updated
 * @param {boolean} [tutorProfileFields.isTutor]
 * @param {string} [tutorProfileFields.education]
 * @param {number} [tutorProfileFields.experience]
 * @param {Models.Level[]} [tutorProfileFields.levels]
 * @param {Models.Subject[]} [tutorProfileFields.subjects]
 * @param {Models.Region} [tutorProfileFields.region]
 */
async function updateTutorProfileById(id, tutorProfileFields) {
  try {
    await updateDoc(doc(db, "users", id), tutorProfileFields);
  } catch (error) {
    console.error("ERROR: failed to update tutor profile by id", error);
    throw error;
  }
}

export { getUserById, getAllUsers, getAllTutors, updateUserById, updateTutorProfileById };
