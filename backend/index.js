const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use((req, res, next) => {
  if (
    req.method === "POST" ||
    req.method === "GET" ||
    req.method === "DELETE" ||
    req.method === "PATCH"
  ) {
    req.bodyContent = JSON.stringify(req.body);
  }
  next();
});

// Configurar Morgan con un formato personalizado que incluya los datos del cuerpo
morgan.token("body", (req) => req.bodyContent || "");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
//#######################
app.get("/", (req, res) => {
  res.send("Hello world!");
});
//#######################
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
//#######################
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    ` <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date.toDateString()}</p>
    </div>`
  );
});
//#######################
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === Number(id));
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});
//#######################
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
//#######################
app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  if (!name || !number) {
    res.status(404).send("You have to fill all the fields");
  } else {
    const id = Math.floor(Math.random() * 1000000);
    const newObject = {
      id: id,
      name: name,
      number: number,
    };
    persons = [...persons, newObject];
    res.status(200).send(`${newObject.name} has been added to the phonebook`);
  }
});

//#######################
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
