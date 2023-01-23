const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password")
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.azj3yur.mongodb.net/todoApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const todoSchema = new mongoose.Schema({
  title: String,
})

const Todo = mongoose.model("Todo", todoSchema)

// const todo = new Todo({
//   title: "TESTI",
// })

// todo.save().then((result) => {
//   console.log("todo saved")
//   mongoose.connection.close()
// })

// Todo.find({}).then((result) => {
//   result.forEach((todo) => console.log(todo))
//   mongoose.connection.close()
// })
