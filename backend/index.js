const express = require("express");
const app = express();

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
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
