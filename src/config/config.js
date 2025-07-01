// Environment configuration
const config = {
  development: {
    API_BASE_URL: "http://localhost:8080",
    FRONTEND_URL: "http://localhost:3000"
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "https://your-backend-domain.com",
    FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://your-frontend-domain.com"
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];
