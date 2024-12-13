const GlobalFunction = {
  logOut() {
    // Clear all user-related data from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("photo");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
    // Optionally, redirect to the login page after logout
    window.location.href = "/login";
  },
};

export default GlobalFunction;
