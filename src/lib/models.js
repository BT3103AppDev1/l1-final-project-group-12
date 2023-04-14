/**
 * @typedef {"PSLE"|"O level"|"A level"} Level
 */

const LEVELS = ["PSLE", "O level", "A level"];

/**
 * @typedef {"Science"|"Math"|"English"|"Arts"} Subject
 */

const SUBJECTS = ["Science", "Math", "English", "Arts"];

/**
 * @typedef {"North"|"South"|"East"|"West"|"Central"} Region
 */

const REGIONS = ["North", "South", "East", "West", "Central"];

/**
 * @typedef {"Male"|"Female"} Gender
 */

const GENDERS = ["Male", "Female"];

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} phoneNumber
 * @property {string} telegramHandle
 * @property {string} email
 * @property {boolean} isTutor
 * @property {Gender} gender
 * @property {string} education
 * @property {number} experience
 * @property {Level[]} levels
 * @property {Subject[]} subjects
 * @property {Region} region
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
 * @property {string} reviewerId
 */

export { LEVELS, SUBJECTS, REGIONS, GENDERS };
