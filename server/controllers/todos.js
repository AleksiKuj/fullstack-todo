const todosRouter = require("express").Router()
const Todo = require("../models/todo")

todosRouter.get("", async (request, response) => {
  Todo.find({}).then((todos) => {
    response.json(todos)
  })
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

todosRouter.post("/", (request, response) => {
  const body = request.body
  if (!body.title) {
    return response.status(400).json({
      error: "title missing",
    })
  }

  const todo = new Todo({
    title: body.title,
    date: new Date(),
  })

  todo.save().then((savedTodo) => {
    response.json(savedTodo)
  })
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
  Todo.findByIdAndUpdate(request.params.id, todo, { new: true })
    .then((updatedTodo) => {
      response.json(updatedTodo)
    })
    .catch((error) => next(error))
})

module.exports = todosRouter
