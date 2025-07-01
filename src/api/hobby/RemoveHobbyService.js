import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";
import { userCache } from "../../utils/cache";

const RemoveHobbyService = async (id) => {
  const username = AuthenticationService.getLoggedInUser();

  try {
    const response = await axios.delete(`/hobbies/remove`, {
      params: {
        id,
        username,
      },
    });

    // Clear the saved hobbies cache since data has changed
    const cacheKey = `saved_hobbies_${username}`;
    userCache.delete(cacheKey);
    console.log('Removed hobby successfully, cleared cache');

    return response;
  } catch (err) {
    console.error('Error removing hobby:', err);
    let error = "";
    if (err.response) {
      error += err.response;
    }
    throw error;
  }
};

export default RemoveHobbyService;
