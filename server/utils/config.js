require("dotenv").config()

let PORT = process.env.PORT || 3001
let MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.DEV_MONGODB_URI
    : process.env.MONGODB_URI

//secret ensures only parties who know the secret can generate a valid token
let SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
}
