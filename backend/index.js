const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const PersonsModel = require("./models/mongo");

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
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Información de la agenda de teléfonos
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date.toDateString()}</p>
    </div>`
  );
});

// Obtener un contacto por ID
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

// Eliminar un contacto por ID
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = persons.length;
  persons = persons.filter((person) => person.id !== id);

  if (persons.length < initialLength) {
    res.status(204).send(console.log(persons));
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

// Añadir un nuevo contacto
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400).send("You have to fill all the fields");
  } else {
    const id = Math.floor(Math.random() * 1000000);
    const newPerson = { id, name, number };
    persons = [...persons, newPerson];
    res.status(200).send(`${newPerson.name} has been added to the phonebook`);
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
