// Dependencies
import axios from "axios";

const APIInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

export default APIInstance