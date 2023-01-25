const testingRouter = require("express").Router()
const Todo = require("../models/todo")
const User = require("../models/user")

testingRouter.post("/reset", async (request, response) => {
  await Todo.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
