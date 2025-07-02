import axios from "../customAxiosConfig/CustomAxiosConfig";

const RegisterBusinessService = async (business) => {
  try {
    const response = await axios.post(`/register`, business);
    return response;
  } catch (err) {
    // Re-throw the error to let the calling component handle it
    throw err;
  }
};

export default RegisterBusinessService;
