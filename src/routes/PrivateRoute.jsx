// src/routes/PrivateRoute.js
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenAboutToExpire, isTokenExpired } from '../features/utils/tokenServices';
import {  refreshToken } from '../features/auth/authSlice';
import { useEffect } from 'react';


export const PrivateRoute = ({ requiredRole, redirectPath = '/login' }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, token, isAuthenticated, isRefreshing } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (token && isTokenAboutToExpire(token) && !isRefreshing) {
      dispatch(refreshToken());
    }
  }, [token, dispatch, isRefreshing]);

  if (isRefreshing) {
    return <div>Renewing session...</div>;
  }

  if (!token || isTokenExpired(token) || !isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }}  />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }}  />;
  }

  return <Outlet />;
};

