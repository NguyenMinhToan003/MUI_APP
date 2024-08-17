import axios from "axios";
import {domain} from '~/utils/common'
// board APIs
export const fetchDataBoardAPI = async (id) => { 
  const response = await axios.get(`${domain}/v1/dashboards/${id}`);
  return response.data
}
export const updateBoardAPI = async (id,data) => { 
  const response = await axios.put(`${domain}/v1/dashboards/${id}`,data);
  return response.data
}
export const moveCardToDifferentColumnsAPI = async (data) => { 
  const response = await axios.put(`${domain}/v1/dashboards/supports/moving_card`,data);
  return response.data
}



// column APIs
export const createColumnAPI = async (data) => { 
  const response = await axios.post(`${domain}/v1/columns`,data);
  return response.data
}
export const updateColumnAPI = async (id,data) => {
  const response = await axios.put(`${domain}/v1/columns/${id}`,data);
  return response.data
}
export const deleteColumnAPI = async (columnId) => {
  const response = await axios.delete(`${domain}/v1/columns/${columnId}`);
  return response.data
}


// card APIs
export const createCardAPI = async (data) => { 
  const response = await axios.post(`${domain}/v1/cards`,data);
  return response.data
}
