import { db } from "../firebase-config";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import * as Models from "../models";

/**
 * Try to create a review
 * @param {object} reviewFields
 * @param {Date} reviewFields.dateCreated
 * @param {string} reviewFields.body
 * @param {number} reviewFields.rating
 * @param {string} reviewFields.tutorId
 * @param {string} reviewFields.reviewerId
 */
async function createReview(reviewFields) {
  try {
    const tutorDoc = doc(db, "users", reviewFields.tutorId);
    const reviewDoc = await addDoc(collection(tutorDoc, "reviews"), reviewFields);
    await updateDoc(reviewDoc, { id: reviewDoc.id });
  } catch (error) {
    console.error("ERROR: failed to create review", error);
  }
}

/**
 * Try to get all reviews by a user
 * @param {string} userId
 */
async function getReviewsByUserId(userId) {
  try {
    const userDoc = doc(db, "users", userId);
    const reviewColl = collection(userDoc, "reviews");
    const querySnap = await getDocs(reviewColl);

    /** @type {Models.Review[]} */
    let reviews = [];

    querySnap.forEach((doc) => {
      reviews.push(doc.data());
    });

    return reviews;
  } catch (error) {
    console.error("ERROR: failed to get reviews by user", error);
  }
}

/**
 * Try update Review by id
 * @param {string} id id of the user to update
 * @param {object} updateFields object with fields to be updated
 * @param {Models.Subject} [updateFields.subject]
 * @param {Models.Level} [updateFields.level]
 * @param {Models.Region} [updateFields.region]
 * @param {string} [updateFields.description]
 * @param {number} [updateFields.rates]
 */
async function updateReviewById(id, updateFields) {
  try {
    await updateDoc(doc(db, id), updateFields);
  } catch (error) {
    console.error("ERROR: failed to update Review by id", error);
  }
}

export { createReview, getReviewsByUserId, updateReviewById };
