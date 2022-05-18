import React from "react";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children, redirectTo, loggedIn }) {
  return loggedIn ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
