import axios from "axios";
import config from "../../../config/config";

const UpdatePasswordService = (id, password) => {
  console.log(id, password);

  try {
    return axios.put(`${config.API_BASE_URL}/password`, null, {
      params: {
        id,
        password,
      },
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default UpdatePasswordService;
