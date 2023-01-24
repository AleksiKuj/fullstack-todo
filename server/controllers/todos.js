const config = require("../utils/config")
const todosRouter = require("express").Router()
const Todo = require("../models/todo")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  // if authorization starts with bearer, replace it with empty
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7)
  }
  return null
}

todosRouter.get("", async (request, response) => {
  const todos = await Todo.find({}).populate("user", { username: 1, name: 1 })
  response.json(todos)
})

todosRouter.get("/:id", (request, response, next) => {
  Todo.findById(request.params.id)
    .then((todo) => {
      if (todo) {
        response.json(todo)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

todosRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }

    const user = await User.findById(decodedToken.id)

    const todo = new Todo({
      title: body.title,
      description: body.description,
      date: new Date(),
      user: user._id,
    })

    const savedTodo = await todo.save()
    user.todos = user.todos.concat(savedTodo._id)
    await user.save()

    response.json(savedTodo)
  } catch (error) {
    next(error)
  }
})
todosRouter.delete("/:id", (request, response, next) => {
  Todo.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

todosRouter.put("/:id", (request, response, next) => {
  const body = request.body
  const todo = { title: body.title }
  Todo.findByIdAndUpdate(request.params.id, todo, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedTodo) => {
      response.json(updatedTodo)
    })
    .catch((error) => next(error))
})

module.exports = todosRouter
