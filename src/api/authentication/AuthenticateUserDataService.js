import axios from "axios";

const AuthenticateUserDataService = async (username, password) => {
  try {
    const response = await axios.post(`http://localhost:8080/authenticate`, {
      username,
      password,
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error("Authentication error:", err);
    // Re-throw the error to let the calling component handle it
    throw err;
  }
};

export default AuthenticateUserDataService;
