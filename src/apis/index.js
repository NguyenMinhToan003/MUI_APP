import axios from "axios";
// board APIs
export const fetchDataBoard = async (id) => { 
  const response = await axios.get(`http://localhost:4000/v1/dashboards/${id}`);
  return response.data
}


// column APIs
export const createColumn = async (data) => { 
  const response = await axios.post(`http://localhost:4000/v1/columns`,data);
  return response.data
}


// card APIs
export const createCard = async (data) => { 
  const response = await axios.post(`http://localhost:4000/v1/cards`,data);
  return response.data
}
