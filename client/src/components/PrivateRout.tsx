import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProp{
    children:JSX.Element
}
const PrivateRoute = ({ children }:PrivateRouteProp) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
