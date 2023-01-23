const config = require("./utils/config")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const todosRouter = require("./controllers/todos")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

const middleware = require("./utils/middleware")
const logger = require("./utils/logger")

const mongoose = require("mongoose")

const mongoUrl = config.MONGODB_URI
mongoose.set("strictQuery", false)

mongoose
  .connect(mongoUrl)
  .then((result) => {
    logger.info("Connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error", error.message)
  })

app.use(express.json())
app.use(cors())

morgan.token("data", (req) => {
  const { body } = req
  return JSON.stringify(body)
})
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :data")
)

app.use("/api/todos", todosRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
