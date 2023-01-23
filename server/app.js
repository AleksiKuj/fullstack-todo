const config = require("./utils/config")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const todosRouter = require("./controllers/todos")
const middleware = require("./utils/middleware")

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

app.use(express.json())

morgan.token("data", (req) => {
  const { body } = req
  return JSON.stringify(body)
})
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :data")
)

app.use(cors())
app.use("/api/todos", todosRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
