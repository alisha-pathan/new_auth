import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import {
    DashboardLayout,
    Overview,
    Analytics,
    Projects,
    Settings,
    Roles,
    ErrorPage,
    Login,
    Register,
    UnauthorizedPage,
} from '../pages';
 
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/unauthorized',
        element: <UnauthorizedPage />,
    },
    {
        element: <PrivateRoute />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        path: '/dashboard',
                        element: <Overview />,
                    },
                    {
                        path: '/analytics',
                        element: <Analytics />,
                    },
                    {
                        path: '/projects',
                        element: <Projects />,
                    },
                    {
                        path: '/settings',
                        element: <Settings />,
                    },
                    {
                        path: '/roles',
                        element: <PrivateRoute requiredRole="admin" />,
                        children: [
                            { path: '/roles', element: <Roles /> },
                        ],
                    },
                ],
            },
        ],
    },

    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
]);


