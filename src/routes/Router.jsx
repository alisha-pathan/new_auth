import React from 'react'
// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import { PrivateRoute } from './PrivateRoute';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute ><Dashboard /></PrivateRoute>
    }
]);

