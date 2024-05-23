// Dependencies
import axios from "axios";

const APIInstance = axios.create({
  baseURL: 'https://662394b63e17a3ac846f9b84.mockapi.io/api/v1',
});

export default APIInstance