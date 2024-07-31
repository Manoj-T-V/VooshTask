import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    //const { isAuthenticated } = useAuth();  //todo
  const isAuthenticated = true; // Hardcode to true for testing

  return isAuthenticated ? (
    React.cloneElement(element, { ...rest })
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
