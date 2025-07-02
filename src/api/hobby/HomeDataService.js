import AuthenticationService from "../authentication/AuthenticationService";
import axios from "../customAxiosConfig/CustomAxiosConfig";

const HomeDataService = async () => {
  try {
    const username = AuthenticationService.getLoggedInUser();
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

    if (!username || (!isUserLoggedIn && !isBusinessLoggedIn)) {
      throw new Error('User not authenticated');
    }

    let role = "business";

    if (isUserLoggedIn) {
      role = "user";
    }

    const response = await axios.get(`/home`, {
      params: {
        username,
        role,
      },
      timeout: 10000, // 10 second timeout
    });

    return response;
  } catch (err) {
    console.error('HomeDataService error:', err);
    
    // Handle authentication errors specifically
    if (err.response && err.response.status === 401) {
      // Authentication failed - clear session and redirect
      AuthenticationService.logout();
      throw new Error('Authentication expired. Please log in again.');
    }
    
    throw err;
  }
};

export default HomeDataService;
