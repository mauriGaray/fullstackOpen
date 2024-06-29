const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const PersonsModel = require("./models/mongo");
const errorHandler = require("./middlewares/errorHandlers");
const unknownEndpoint = require("./middlewares/unknownEndpoint");

const PORT = process.env.PORT || 3000;

// Configuración de middlewares
app.use(express.static("dist"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para capturar el contenido del cuerpo de la solicitud
app.use((req, res, next) => {
  if (["POST", "GET", "DELETE", "PATCH"].includes(req.method)) {
    req.bodyContent = JSON.stringify(req.body);
  }
  next();
});

// Configuración de Morgan con un formato personalizado que incluya los datos del cuerpo
morgan.token("body", (req) => req.bodyContent || "");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Rutas
// Ruta principal
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Obtener todos los contactos
app.get("/api/persons", async (req, res, next) => {
  PersonsModel.find({})
    .then((result) => res.send(result))
    .catch((err) => next(err));
});

// Información de la agenda de teléfonos
app.get("/info", (req, res, next) => {
  const date = new Date();
  res.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date.toDateString()}</p>
    </div>`
  );
});

// Obtener un contacto por ID
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }
  PersonsModel.findById(id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

// Eliminar un contacto por ID
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  // Verificar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }
  PersonsModel.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send("Person not found");
      }
      res.status(200).send("Person deleted successfully");
    })
    .catch((err) => next(err));
});

// Añadir un nuevo contacto
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(404).send({ error: "You have to fill all the fields" });
  }

  const person = new PersonsModel({ name: name, number: number });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});
app.use(unknownEndpoint);
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
