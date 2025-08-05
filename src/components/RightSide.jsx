import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaBell } from "react-icons/fa";
import { UserDropdown } from "./UserDropDown";
import { useDarkMode } from "./DarkModeContext";

export const RightSide = ({ isSidebarOpen, toggleSidebar, user }) => {
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useDarkMode();

    const getPageTitle = () => {
        const titles = {
            '/dashboard': 'Dashboard',
            '/analytics': 'Analytics',
            '/projects': 'Projects',
            '/roles': 'Roles',
            '/settings': 'Settings'
        };
        return titles[location.pathname] || 'Dashboard';
    };

    useEffect(() => {
        console.log("Current path changed:", location.pathname);
    }, [location.pathname]);

    return (
        <motion.div
            className={`border-b p-4 px-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm transition-colors duration-200`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/* Sidebar toggle button */}
                    <button
                        onClick={toggleSidebar}
                        className={`p-2 rounded-lg mr-4 transition-all duration-200 ${darkMode
                            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-md'
                            : 'bg-white text-yellow-600 hover:bg-gray-100 shadow-sm'
                            }`}
                        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isSidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Page title */}
                    <motion.h2
                        key={location.pathname}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
                    >
                        {getPageTitle()}
                    </motion.h2>
                </div>

                {/* Right side icons */}
                <div className="flex items-center space-x-4">
                    <button
                        className={`p-2 rounded-full transition-all duration-200 relative ${darkMode
                            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700  shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                            }`}
                        aria-label="Search"
                    >
                        <FaSearch className={`h-5 w-5 `} />
                    </button>

                    <button
                        className={`p-2 rounded-full transition-all duration-200 relative 
                            ${darkMode
                                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                            }`}
                        aria-label="Notifications"
                    >
                        <FaBell className="h-5 w-5" />
                    </button>

                    <UserDropdown user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </div>
            </div>
        </motion.div>
    );
};