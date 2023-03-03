/**
 * @typedef {("PSLE"|"O level"|"A level")} Level
 */

/**
 * @typedef {("Science"|"Math"|"English"|"Arts")} Subject
 */

/**
 * @typedef {"North"|"South"|"East"|"West"|"Central"} Region
 */

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} phoneNumber
 * @property {string} telegramHandle
 * @property {string} email
 * @property {boolean} isTutor
 * @property {string} education
 * @property {number} experience
 * @property {Level[]} levels
 * @property {Subject[]} subjects
 * @property {Region} region
 * @property {Review[]} reviews
 */

/**
 * @typedef {object} Listing
 * @property {string} id
 * @property {Date} dateCreated
 * @property {Subject} subject
 * @property {Level} level
 * @property {Region} region
 * @property {string} description
 * @property {number} rates
 * @property {string} userId
 */

/**
 * @typedef {object} Review
 * @property {string} id
 * @property {Date} dateCreated
 * @property {string} body
 * @property {number} rating
 * @property {string} tutorId
 * @property {string} userId
 */

export {};
