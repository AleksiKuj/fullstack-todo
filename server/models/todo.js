const config = require("../utils/config")
const mongoose = require("mongoose")

const mongoUrl = config.MONGODB_URI
mongoose.set("strictQuery", false)

mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("error", error.message)
  })

const todoSchema = new mongoose.Schema({
  title: String,
  date: String,
})

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Todo", todoSchema)
