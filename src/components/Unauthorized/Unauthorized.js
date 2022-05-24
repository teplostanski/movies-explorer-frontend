import React from "react";
import { Navigate } from "react-router-dom";


function Unauthorized({ children, redirectTo, loggedIn }) {
  return loggedIn ? children : <Navigate to={redirectTo} />;
}

export default Unauthorized;
