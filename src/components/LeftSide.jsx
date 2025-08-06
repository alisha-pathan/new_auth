import { NavLink } from 'react-router-dom';

export const LeftSide = ({ isCollapsed, toggleSidebar }) => {
    return (
        <div className="p-4 h-full flex flex-col">
            {/* Logo/Toggle Area */}
            <div
                className="flex items-center space-x-2 p-4 mb-8 cursor-pointer text-yellow-400 hover:text-yellow-500 rounded-lg"
                onClick={toggleSidebar}
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {!isCollapsed && <span className="text-xl font-bold">DashboardPro</span>}
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-yellow-800 text-white' : 'text-indigo-100 hover:bg-gray-800'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {!isCollapsed && <span>Overview</span>}
                </NavLink>

                <NavLink
                    to="/analytics"
                    className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-yellow-800 text-white' : 'text-indigo-100 hover:bg-gray-800'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {!isCollapsed && <span>Analytics</span>}
                </NavLink>

                <NavLink
                    to="/projects"
                    className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-yellow-800 text-white' : 'text-indigo-100 hover:bg-gray-800'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {!isCollapsed && <span>Projects</span>}
                </NavLink>

                <NavLink
                    to="/roles"
                    className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-yellow-800 text-white' : 'text-indigo-100 hover:bg-gray-800'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 0v4m0-4h4m-4 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2m8 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2m8 0h4m-4 0H8" />
                    </svg>
                    {!isCollapsed && <span>Roles</span>}
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-yellow-800 text-white' : 'text-indigo-100 hover:bg-gray-800'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 0v4m0-4h4m-4 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2m8 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2m8 0h4m-4 0H8" />
                    </svg>
                    {!isCollapsed && <span>Settings</span>}
                </NavLink>

            </nav>
        </div>
    );
};


