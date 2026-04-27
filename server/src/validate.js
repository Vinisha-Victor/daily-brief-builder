// const VALID_THEMES = [
//   "midnight",    // deep dark blue-black (your current default)
//   "aurora",      // deep purple + teal glow
//   "ember",       // warm dark — amber, rust, charcoal
//   "arctic",      // cold minimal — icy blue, white, silver
//   "noir",        // pure black + white, high contrast
//   "forest",      // dark green, earthy tones
// ];

// const VALID_LANGUAGES = ["en", "de"];

// const VALID_BRIEF_TIMES = ["morning", "afternoon", "night"];

// const VALID_UNITS = ["metric", "imperial"];

// const VALID_CATEGORIES = [
//   "general",
//   "technology",
//   "science",
//   "business",
//   "health",
//   "sports",
//   "entertainment",
//   "politics",
//   "world",
// ];

// function validatePreferences(data) {
//   const errors = [];

//   // name — optional but must be string if provided
//   if (data.name !== undefined && typeof data.name !== "string") {
//     errors.push("name must be a string");
//   }

//   // city — optional but must be string if provided
//   if (data.city !== undefined && typeof data.city !== "string") {
//     errors.push("city must be a string");
//   }

//   // categories — must be array of valid strings
//   if (data.categories !== undefined) {
//     if (!Array.isArray(data.categories)) {
//       errors.push("categories must be an array");
//     } else {
//       const invalid = data.categories.filter((c) => !VALID_CATEGORIES.includes(c));
//       if (invalid.length > 0) {
//         errors.push(`invalid categories: ${invalid.join(", ")}. Valid: ${VALID_CATEGORIES.join(", ")}`);
//       }
//     }
//   }

//   // theme
//   if (data.theme !== undefined && !VALID_THEMES.includes(data.theme)) {
//     errors.push(`invalid theme. Valid themes: ${VALID_THEMES.join(", ")}`);
//   }

//   // language
//   if (data.language !== undefined && !VALID_LANGUAGES.includes(data.language)) {
//     errors.push(`invalid language. Valid: ${VALID_LANGUAGES.join(", ")}`);
//   }

//   // brief_time
//   if (data.brief_time !== undefined && !VALID_BRIEF_TIMES.includes(data.brief_time)) {
//     errors.push(`invalid brief_time. Valid: ${VALID_BRIEF_TIMES.join(", ")}`);
//   }

//   // units
//   if (data.units !== undefined && !VALID_UNITS.includes(data.units)) {
//     errors.push(`invalid units. Valid: ${VALID_UNITS.join(", ")}`);
//   }

//   return errors;
// }

// module.exports = {
//   validatePreferences,
//   VALID_THEMES,
//   VALID_LANGUAGES,
//   VALID_BRIEF_TIMES,
//   VALID_UNITS,
//   VALID_CATEGORIES,
// };

export const VALID_THEMES = [
  'midnight',
  'aurora',
  'ember',
  'arctic',
  'noir',
  'forest',
]

export const VALID_LANGUAGES = ['en', 'de']
export const VALID_BRIEF_TIMES = ['morning', 'afternoon', 'night']
export const VALID_UNITS = ['metric', 'imperial']
export const VALID_CATEGORIES = [
  'general', 'technology', 'science', 'business',
  'health', 'sports', 'entertainment', 'politics', 'world',
]

export function validatePreferences(data) {
  const errors = []

  if (data.name !== undefined && typeof data.name !== 'string')
    errors.push('name must be a string')

  if (data.city !== undefined && typeof data.city !== 'string')
    errors.push('city must be a string')

  if (data.categories !== undefined) {
    if (!Array.isArray(data.categories)) {
      errors.push('categories must be an array')
    } else {
      const invalid = data.categories.filter(c => !VALID_CATEGORIES.includes(c))
      if (invalid.length > 0)
        errors.push(`invalid categories: ${invalid.join(', ')}. Valid: ${VALID_CATEGORIES.join(', ')}`)
    }
  }

  if (data.theme !== undefined && !VALID_THEMES.includes(data.theme))
    errors.push(`invalid theme. Valid: ${VALID_THEMES.join(', ')}`)

  if (data.language !== undefined && !VALID_LANGUAGES.includes(data.language))
    errors.push(`invalid language. Valid: ${VALID_LANGUAGES.join(', ')}`)

  if (data.brief_time !== undefined && !VALID_BRIEF_TIMES.includes(data.brief_time))
    errors.push(`invalid brief_time. Valid: ${VALID_BRIEF_TIMES.join(', ')}`)

  if (data.units !== undefined && !VALID_UNITS.includes(data.units))
    errors.push(`invalid units. Valid: ${VALID_UNITS.join(', ')}`)

  return errors
}