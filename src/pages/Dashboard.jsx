
import { Outlet } from 'react-router-dom';
import { LeftSide, RightSide } from '../components';
import { useState } from 'react';

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Left Side - Navigation */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-950 text-white shadow-lg flex-shrink-0 transition-all duration-300`}>
                <LeftSide isCollapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Right Side - Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <RightSide isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};


