import axios from "axios";
import config from "../config/config";

const HomeDataService = () => {
  try {
    return axios.get(`${config.API_BASE_URL}/`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

const HomeService = () => {
  try {
    return axios.get(`${config.API_BASE_URL}/`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default HomeService;
