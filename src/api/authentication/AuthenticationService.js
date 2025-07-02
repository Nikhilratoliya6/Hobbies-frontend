class AuthenticationService {
  registerSuccessfulLoginBusiness(username) {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", "business");
    console.log("Successful login");
  }

  registerSuccessfulLoginUser(username) {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", "user");
    console.log("Successful login");
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload(false);
  }

  isUserLoggedIn() {
    let role = sessionStorage.getItem("role");
    let username = sessionStorage.getItem("authenticatedUser");
    return role === "user" && username !== null && username !== "";
  }

  isBusinessLoggedIn() {
    let role = sessionStorage.getItem("role");
    let username = sessionStorage.getItem("authenticatedUser");
    return role === "business" && username !== null && username !== "";
  }

  getLoggedInUser() {
    let username = sessionStorage.getItem("authenticatedUser");
    if (username == null) {
      return "";
    } else {
      return username;
    }
  }

  setUpToken(jwtToken) {
    localStorage.setItem("token", jwtToken);
  }
}

export default new AuthenticationService();
