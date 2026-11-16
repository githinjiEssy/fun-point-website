/**
 * @typedef {'game' | 'challenge' | 'creative'} ActivityKind
 *
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} description
 * @property {ActivityKind} kind
 * @property {string} theme          // savannah | coast | forest | highlands
 * @property {string} emoji
 * @property {string} color          // token name: leaf | sun | orange | sky | coral
 * @property {number} minutes
 * @property {number} xp
 * @property {string[]} instructions
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category     // art | puzzles | adventure | journals | accessories
 * @property {number} price        // KES
 * @property {string} summary
 * @property {string} description
 * @property {string} emoji
 * @property {string} color
 * @property {string[]} tags
 *
 * @typedef {Object} Experience
 * @property {string} id
 * @property {string} title
 * @property {string} category     // workshop | birthday | holiday | group
 * @property {number} price        // KES, per child or per session
 * @property {string} summary
 * @property {string} description
 * @property {string} emoji
 * @property {string} color
 * @property {number} durationMins
 * @property {string} ageRange
 * @property {string[]} sessions   // illustrative slots
 */
export {}