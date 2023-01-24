const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  // get title and date of each todo from user
  const users = await User.find({}).populate("todos", { title: 1, date: 1 })
  response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  const existingUser = await User.findOne({ username: username })
  if (existingUser) {
    return response.send("User already exists")
  }
  if (username.length === 0 || password.length === 0) {
    return response.status(401).json({
      error: "Enter username and password",
    })
  }
  if (password.length < 3 || username.length < 3) {
    return response.status(401).json({
      error: "username and password must be at least 3 characters long",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
