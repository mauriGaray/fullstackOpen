const errorHandler = (error, req, res, next) => {
  console.error("El error ocurrido es: ", error);
  switch (error.name) {
    case "CastError":
      return res.status(400).send({ error: "Malformatted id" });
    case "UnauthorizedError":
      return res.status(401).send({ error: "Unauthorized" });

    default:
      return res.status(500).send({ error: "Internal server error" });
  }
  next(error);
};
module.exports = errorHandler;
