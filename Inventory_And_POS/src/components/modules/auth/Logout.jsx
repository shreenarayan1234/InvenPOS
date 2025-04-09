import React, { useEffect } from "react";
import axios from "axios";
import Constants from "../../../Constants";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${Constants.BASE_URL}/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        localStorage.removeItem('photo');
        
        // Redirect to login
        navigate('/login');
        window.location.reload();
      }
    };

    logout();
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Logout;
