import axios from "../customAxiosConfig/CustomAxiosConfig";

const UserEmailDataService = async (email) => {
  try {
    const response = await axios.post(`/notification`, null, {
      params: {
        email,
      },
    });
    return response;
  } catch (err) {
    console.error("Password reset error:", err);
    if (err.response) {
      return err.response;
    }
    // If no response, return a mock response with error status
    return {
      status: 404,
      data: { message: "Network error or server unavailable" }
    };
  }
};

export default UserEmailDataService;
