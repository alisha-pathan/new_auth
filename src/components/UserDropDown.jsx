import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FaCog, FaSignOutAlt, FaUser, FaChevronDown, FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const UserDropdown = ({ user, darkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    };

    return (
        <div className="relative inline-block">
            <div
                className="flex items-center cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >
                <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'hover:bg-gray-100'}  flex items-center justify-center text-white shadow-sm`}>
                    <FaUser className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="ml-2 flex items-center">

                    {/* <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                        <FaChevronDown className="w-3 h-3" />
                    </motion.div> */}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-1 z-50 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        transition={{ duration: 0.15 }}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {user?.email || "user@example.com"}
                            </p>
                        </div>

                        <a href="#" className={`flex items-center px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>
                            <FaUser className={`w-4 h-4 mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            Profile
                        </a>
                        <a href="#" className={`flex items-center px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>
                            <FaCog className={`w-4 h-4 mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            Settings
                        </a>

                        <button
                            onClick={toggleDarkMode}
                            className={`w-full text-left flex items-center px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                        >
                            {darkMode ? (
                                <FaSun className={`w-4 h-4 mr-3 ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`} />
                            ) : (
                                <FaMoon className={`w-4 h-4 mr-3 ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`} />
                            )}
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>

                        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} my-1`}></div>

                        <button
                            onClick={handleLogout}
                            className={`w-full text-left flex items-center px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                        >
                            <FaSignOutAlt className={`w-4 h-4 mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            Sign out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

