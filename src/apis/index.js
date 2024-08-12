import axios from "axios";
const fetchDataBoard = async (id) => { 
  const response = await axios.get(`http://localhost:4000/v1/dashboards/${id}`);
  return response.data
}
export { fetchDataBoard }