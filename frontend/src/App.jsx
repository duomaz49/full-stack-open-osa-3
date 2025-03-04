import service from "../services/service";
import { useState, useEffect } from "react";
import FilterPerson from "./components/FilterPerson";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import NotificationMessage from "./components/NotificationMessage";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState({
    message: "",
    isSuccess: null,
  });

  useEffect(() => {
    service
      .getPersonsFromDb(setMessage)
      .then((dbPersons) => setPersons(dbPersons));
  }, []);

  const isIncluded = (name) => {
    return persons.find((obj) => obj.name === name);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: name.trim(),
      number: number.trim(),
    };

    if (isIncluded(newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already in the phonebook, replace the old number with new one?`
        )
      ) {
        const updatePerson = persons.find((p) => p.name === newPerson.name);
        service
          .updatePersonOnDb(newPerson, updatePerson.id, setMessage)
          .then((dbPerson) => {
            setPersons((prev) =>
              prev.map((person) =>
                person.id !== updatePerson.id ? person : dbPerson
              )
            );
          });
        return;
      }
    }
    service
      .addPersonToDb(newPerson, setMessage)
      .then((dbPerson) =>
        setPersons((prevPersons) => [...prevPersons, dbPerson])
      );
    setName("");
    setNumber("");
  };

  const triggerDelete = (id, name) => {
    if (window.confirm(`Delete person ${name}`)) {
      service
        .deletePersonOnDb(id, name, setMessage)
        .then(() => setPersons((prev) => prev.filter((p) => p.id !== id)));
    }
  };

  const filterPersons = query
    ? persons.filter(
        (obj) =>
          obj.name?.toLowerCase().includes(query?.toLowerCase()) ||
          obj.number?.toLowerCase().includes(query?.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage message={message} />
      <div>
        Filter phonebook with name or number:{" "}
        <FilterPerson setQuery={setQuery} />
      </div>

      <div>
        <h2>Add new:</h2>
        <PersonForm
          addPerson={addPerson}
          name={name}
          setName={setName}
          number={number}
          setNumber={setNumber}
        />
      </div>

      <div>
        <h2>Persons:</h2>
        <PersonsList
          filterPersons={filterPersons}
          triggerDelete={triggerDelete}
        />
      </div>
    </div>
  );
};

export default App;
