import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const RightSide = ({ isSidebarOpen, toggleSidebar }) => {
    const location = useLocation();
    
    // Get the current path and extract the page title
    const getPageTitle = () => {
        switch(location.pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/analytics':
                return 'Analytics';
            case '/projects':
                return 'Projects';
            case '/roles':
                return 'Roles';
            case '/settings':
                return 'Settings';
            default:
                return 'Dashboard'; // Default fallback
        }
    };

    useEffect(() => {
        console.log("Current path changed:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="border-b border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/* Sidebar toggle button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 mr-4 transition-colors"
                        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isSidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Page title */}
                    <h2 className="text-lg font-semibold text-gray-800">
                        {getPageTitle()}
                    </h2>
                </div>

                {/* Right side icons */}
                <div className="flex items-center space-x-4">
                    <button 
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        aria-label="Search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button 
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        aria-label="Notifications"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                    <div 
                        className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-gray-800 transition-colors "
                        aria-label="User profile"
                    >
                        U
                    </div>
                </div>
            </div>
        </div>
    );
};

