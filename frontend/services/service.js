import axios from "axios";

const BASE_URL = "/api/persons";

const getPersonsFromDb = (setMessage) => {
  const req = axios.get(BASE_URL);
  return req
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((e) => {
      setMessage({
        message: `Error getting data from server`,
        isSuccess: false,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
};

const addPersonToDb = (newPerson, setMessage) => {
  const req = axios.post(BASE_URL, newPerson);
  return req
    .then((res) => {
      if (res.data) {
        setMessage({
          message: `Added ${newPerson.name}`,
          isSuccess: true,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        return res.data;
      }
    })
    .catch((e) => {
      setMessage({
        message: `Error adding '${newPerson.name}' to server`,
        isSuccess: false,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
};

const updatePersonOnDb = (updatePerson, id, setMessage) => {
  const req = axios.put(`${BASE_URL}/${id}`, updatePerson);
  return req
    .then((res) => {
      if (res.data) {
        setMessage({
          message: `Updated ${updatePerson.name}`,
          isSuccess: true,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        return res.data;
      }
    })
    .catch((e) => {
      setMessage({
        message: `Error updating '${updatePerson.name}`,
        isSuccess: false,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
};

const deletePersonOnDb = (id, name, setMessage) => {
  const req = axios.delete(`${BASE_URL}/${id}`);
  return req
    .then((res) => {
      if (res.data) {
        setMessage({
          message: `Deleted ${name}`,
          isSuccess: true,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        return res.data;
      }
    })
    .catch((e) => {
      setMessage({
        message: `Error deleting '${newPerson.name}`,
        isSuccess: false,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
};

export default {
  getPersonsFromDb,
  addPersonToDb,
  deletePersonOnDb,
  updatePersonOnDb,
};
