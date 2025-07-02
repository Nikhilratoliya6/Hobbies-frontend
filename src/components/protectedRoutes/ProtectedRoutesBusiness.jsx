import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthenticationService from "../../api/authentication/AuthenticationService";
import { Navigate } from "react-router-dom";

const ProtectedRoutesBusiness = () => {
  const [isAuth, setIsAuth] = useState(null); // null = checking, true/false = result

  useEffect(() => {
    const checkAuth = () => {
      const authResult = AuthenticationService.isBusinessLoggedIn();
      setIsAuth(authResult);
    };

    checkAuth();
    
    // Also check when storage changes (for logout/login events)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Show loading state while checking authentication
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesBusiness;
