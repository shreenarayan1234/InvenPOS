import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../Constants";
import GlobalFunction from "../../GlobalFunction";

const Nav = () => {
  // const handleLogout = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You will be logged out!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Logout!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Before sending the request, ensure the token is being sent
  //       const token = localStorage.getItem("token");

  //       // If the token exists, send the logout request
  //       if (token) {
  //         axios
  //           .post(`${Constants.BASE_URL}/logout`, {}, {  // Send a POST request to /logout with an empty body
  //             headers: {
  //               Authorization: `Bearer ${token}`,  // Attach token to Authorization header
  //             },
  //           })
  //           .then(() => {
  //             // Call the logout function to clear localStorage and redirect
  //             GlobalFunction.logOut();
  //           })
  //           .catch((error) => {
  //             // Handle logout failure
  //             console.error("Logout failed:", error);
  //             Swal.fire("Error", "Logout failed. Please try again.", "error");
  //           });
  //       } else {
  //         // If there's no token, treat as logged out
  //         Swal.fire("Error", "No token found. You are already logged out.", "error");
  //       }
  //     }
  //   });
  // };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Ensure the token exists in localStorage
        const token = localStorage.getItem("token");
  
        if (token) {
          axios
            .post(`${Constants.BASE_URL}/logout`, {}, {
              headers: {
                Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
              }
            })
            .then(() => {
              // Successfully logged out, clear the localStorage
              GlobalFunction.logOut();
              window.location.reload();  // Reload to reflect the logout
            })
            .catch((error) => {
              console.error("Logout failed:", error);
              Swal.fire("Error", "Logout failed. Please try again.", "error");
            });
        } else {
          console.log("No token found.");
          Swal.fire("Error", "No token found. You are already logged out.", "error");
        }
      }
    });
  };
  
  const handleSidebar = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="/dashboard">
        InvenPOS
      </a>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        onClick={handleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      <ul className="navbar-nav ms-auto me-3 me-lg-4">
        <span className="text-white d-flex align-items-center" style={{ margin: 0, padding: 0 }}>
          {localStorage.getItem("name") || "Admin"}
        </span>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="/settings">Settings</a></li>
            <li><a className="dropdown-item" href="/activity-log">Activity Log</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
