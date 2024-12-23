import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  console.log(token, role);
  console.log(!token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedRoutes;
