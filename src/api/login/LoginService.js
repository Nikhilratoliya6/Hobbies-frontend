import axios from "../customAxiosConfig/CustomAxiosConfig";

const LoginService = async (username) => {
  try {
    const response = await axios.post(`/login`, null, {
      params: {
        username,
      },
    });
    return response;
  } catch (err) {
    console.error("Login service error:", err);
    // Re-throw the error to let the calling component handle it
    throw err;
  }
};

export default LoginService;
