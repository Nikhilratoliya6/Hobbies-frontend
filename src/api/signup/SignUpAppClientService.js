import axios from "../customAxiosConfig/CustomAxiosConfig";

const SignUpAppClientService = async (user) => {
  try {
    const response = await axios.post(`/signup`, user);
    return response;
  } catch (err) {
    // Re-throw the error to let the calling component handle it
    throw err;
  }
};

export default SignUpAppClientService;
