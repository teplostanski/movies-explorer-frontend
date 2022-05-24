import React from "react";
import { Navigate } from "react-router-dom";

function Authorized({ children, redirectTo, loggedIn }) {
  return loggedIn ? <Navigate to={redirectTo} /> : children;
}
export default Authorized;