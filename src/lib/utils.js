/**
 * Validate input object, with empty value as `undefined` and `userId` as auth field
 * @param {object} inputs
 */
function validateInputs(inputs) {
  for (const key of Object.keys(inputs)) {
    if (inputs[key] === undefined) {
      if (key === "userId") {
        throw Error("ERROR (createListingOnClick): not authed");
      }

      throw Error(`ERROR (createListingOnClick): invalid input [${key}]`);
    }
  }
}

export { validateInputs };
