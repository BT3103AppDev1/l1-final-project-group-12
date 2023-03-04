import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import * as Models from "../models";
import { getUserById } from "./user";

/**
 * Try to create a listing
 * @param {("student-listing"|"tutor-listing")} collectionName
 * @param {object} listingFields
 * @param {string} listingFields.userId
 * @param {Date} listingFields.dateCreated
 * @param {Models.Subject} listingFields.subject
 * @param {Models.Level} listingFields.level
 * @param {Models.Region} listingFields.region
 * @param {string} listingFields.description
 * @param {number} listingFields.rates
 */
async function createListing(collectionName, listingFields) {
  try {
    const isTutor = (await getUserById(listingFields.userId)).isTutor;

    if (!isTutor && collectionName === "tutor-listing") {
      throw Error("not a tutor, cannot make tutor listing");
    }

    const listingDoc = await addDoc(collection(db, collectionName), listingFields);
    await updateDoc(listingDoc, { id: listingDoc.id });
  } catch (error) {
    console.error("ERROR: failed to create listing", collectionName, error);
  }
}

/**
 * Try to get listing by id
 * @param {("student-listing"|"tutor-listing")} collectionName
 * @param {string} id id of the student listing to get
 */
async function getListingById(collectionName, id) {
  try {
    const docSnap = await getDoc(doc(db, collectionName, id));

    if (docSnap.exists()) {
      /** @type {Models.Listing} */
      const listingData = docSnap.data();

      return listingData;
    } else {
      throw Error("listing not found");
    }
  } catch (error) {
    console.error("ERROR: failed to get listing by id", collectionName, error);
  }
}

/**
 * Try to get all listings
 * @param {("student-listing"|"tutor-listing")} collectionName
 */
async function getAllListings(collectionName) {
  try {
    const querySnap = await getDocs(collection(db, collectionName));

    /** @type {Models.Listing[]} */
    let listings = [];

    querySnap.forEach((doc) => {
      listings.push(doc.data());
    });

    return listings;
  } catch (error) {
    console.error("ERROR: failed to get all listings", collectionName, error);
  }
}

/**
 * Try to get all listings that match query
 * @param {("student-listing"|"tutor-listing")} collectionName
 * @param {object} queryFields
 * @param {Models.Subject} [queryFields.subject]
 * @param {Models.Level} [queryFields.level]
 * @param {Models.Region} [queryFields.region]
 * @param {object} [queryFields.rates]
 * @param {number} [queryFields.rates.lower]
 * @param {number} [queryFields.rates.upper]
 */
async function getListingsByQuery(collectionName, queryFields) {
  try {
    /** @type {QueryConstraint[]} */
    const constraints = [];

    Object.keys(queryFields).forEach((key) => {
      if (key === "rates") {
        if (queryFields.rates.upper) {
          constraints.push(where("rates", "<=", queryFields.rates.upper));
        }
        if (queryFields.rates.lower) {
          constraints.push(where("rates", ">=", queryFields.rates.lower));
        }
        return;
      }
      constraints.push(where(key, "==", queryFields[key]));
    });

    const querySnap = await getDocs(query(collection(db, collectionName), ...constraints));

    /** @type {Models.Listing[]} */
    let listings = [];

    querySnap.forEach((doc) => {
      listings.push(doc.data());
    });

    return listings;
  } catch (error) {
    console.error("ERROR: failed to get all queried listings", collectionName, error);
  }
}

/**
 * Try update listing by id
 * @param {("student-listing"|"tutor-listing")} collectionName
 * @param {string} id id of the user to update
 * @param {object} updateFields object with fields to be updated
 * @param {Models.Subject} [updateFields.subject]
 * @param {Models.Level} [updateFields.level]
 * @param {Models.Region} [updateFields.region]
 * @param {string} [updateFields.description]
 * @param {number} [updateFields.rates]
 */
async function updateListingById(collectionName, id, updateFields) {
  try {
    await updateDoc(doc(db, collectionName, id), updateFields);
  } catch (error) {
    console.error("ERROR: failed to update listing by id", collectionName, error);
  }
}

export { createListing, getListingById, getListingsByQuery, getAllListings, updateListingById };
