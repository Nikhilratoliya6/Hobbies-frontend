import axios from "axios";
import config from "../../config/config";

const AuthenticateUserDataService = (username, password) => {
  return axios
    .post(`${config.API_BASE_URL}/authenticate`, {
      username,
      password,
    })
    .then((res) => {
      if (res != null) {
        console.log(res);
        return res;
      }
    })
    .catch((err) => {
      let error = "";

      if (err.response) {
        error += err.response;
      }
      return error;
    });
};

export default AuthenticateUserDataService;
