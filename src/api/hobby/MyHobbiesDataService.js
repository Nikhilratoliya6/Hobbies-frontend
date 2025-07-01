import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";
import { userCache } from "../../utils/cache";

const MyHobbiesDataService = async (forceRefresh = false) => {
  const username = AuthenticationService.getLoggedInUser();
  
  if (!username) {
    console.warn('No username found, user may not be logged in');
    throw new Error('User not authenticated');
  }
  
  const cacheKey = `saved_hobbies_${username}`;

  // Check cache first unless force refresh is requested
  if (!forceRefresh) {
    const cached = userCache.get(cacheKey);
    if (cached) {
      console.log('Using cached saved hobbies data:', cached);
      return Promise.resolve(cached);
    }
  }

  try {
    console.log('Fetching saved hobbies for username:', username);
    const response = await axios.get(`/hobbies/saved`, {
      params: {
        username,
      },
    });

    console.log('API response received:', response);
    
    // Validate response structure
    if (!response || !response.data) {
      console.warn('Invalid response structure:', response);
      const fallbackResponse = { data: [] };
      userCache.set(cacheKey, fallbackResponse);
      return fallbackResponse;
    }

    // Cache the response
    userCache.set(cacheKey, response);
    console.log('Fetched fresh saved hobbies data from API, count:', 
      Array.isArray(response.data) ? response.data.length : 'unknown');
    
    return response;
  } catch (err) {
    console.error('Error in MyHobbiesDataService:', err);
    if (err.response) {
      console.error('Error response:', err.response.status, err.response.data);
    }
    throw err;
  }
};

export default MyHobbiesDataService;
