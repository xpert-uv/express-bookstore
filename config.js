/** Common config for bookstore. */


let DB_URI = `postgresql://postgres:ghimire@localhost`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/books_test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/book`;
}


module.exports = { DB_URI };