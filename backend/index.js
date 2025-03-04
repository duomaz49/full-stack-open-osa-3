const express = require("express");
const generateId = require("./helper");
const morgan = require("morgan");

const app = express();

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
];

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info of ${persons.length} people</br>
        <p>${new Date().toString()}</p>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    return res.json(person);
  } else {
    return res
      .status(404)
      .json({
        error: "Person with id not found",
      })
      .end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(persons),
  };

  if (persons.some((p) => p.name === person.name)) {
    return res.status(400).json({
      error: "Persons name must be unique",
    });
  }

  persons = persons.concat(person);

  res.json(person);
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }

  const updatedPerson = {
    ...person,
    name: req.body.name,
  };

  persons = persons.map((p) => (p.id !== id ? p : updatedPerson));

  res.json(updatedPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
