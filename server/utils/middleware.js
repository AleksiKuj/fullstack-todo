const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unkown endpoint",
  })
}
const errorHandler = (error, request, response, next) => {
  try {
    console.error(error.message)

    if (error.name === "CastError") {
      return response.status(400).json({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message })
    } else if (error.name === "JsonWebTokenError") {
      return response.status(400).json({ error: "token missing or invalid" })
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        error: "token expired",
      })
    } else if (
      error instanceof Error &&
      error.name === "MongoError" &&
      error.driver
    ) {
      if (error.code == 11000) {
        // unique index conflict
        return ["Resource document already exists."]
      }
    }
  } catch (error) {
    response.status(500).send("An unkown error occurred")
  }
  next(error)
}

module.exports = {
  errorHandler,
  unknownEndpoint,
}
