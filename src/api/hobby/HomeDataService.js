import AuthenticationService from "../authentication/AuthenticationService";
import axios from "../customAxiosConfig/CustomAxiosConfig";

const HomeDataService = () => {
  let username = AuthenticationService.getLoggedInUser();
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

  console.log('HomeDataService called:', {
    username,
    isUserLoggedIn,
    isBusinessLoggedIn
  });

  try {
    let role = "business";

    if (isUserLoggedIn) {
      role = "user";
    }

    console.log('HomeDataService making request with:', { username, role });

    return axios.get(`/home`, {
      params: {
        username,
        role,
      },
    });
  } catch (err) {
    console.error('HomeDataService error:', err);
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default HomeDataService;
