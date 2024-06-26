import axios from "axios";
const PORT = 3000;
const baseUrl = `https://openfullback.fly.dev/api/persons`;
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);

  return request.then((res) => {
    return res;
  });
};
export default {
  getAll,
  create,
  update,
  deletePerson,
};
