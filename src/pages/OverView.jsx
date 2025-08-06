import React from 'react';
import { useDarkMode } from '../components/DarkModeContext';
import { ProjectsTable, ActivityFeed, RevenueChart, StatsCard } from '../components';

export const Overview = () => {
    const { darkMode } = useDarkMode();

    const stats = [
        {
            title: "Total Revenue",
            value: "$24,780",
            change: "+12.5%",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgColor: "bg-green-100",
            textColor: "text-green-500"
        },
        {
            title: "New Users",
            value: "1,245",
            change: "+8.2%",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            bgColor: "bg-blue-100",
            textColor: "text-blue-500"
        },
        {
            title: "Active Projects",
            value: "42",
            change: "-3.1%",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            bgColor: "bg-purple-100",
            textColor: "text-red-500"
        },
        {
            title: "Tasks Completed",
            value: "287",
            change: "+21.7%",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgColor: "bg-yellow-100",
            textColor: "text-green-500"
        }
    ];

    return (
        <div className={`space-y-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} p-5`}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        bgColor={stat.bgColor}
                        textColor={stat.textColor}
                        darkMode={darkMode}
                    />
                ))}
            </div>

            {/* Chart and Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart darkMode={darkMode} />
                <ActivityFeed darkMode={darkMode} />
            </div>

            {/* Projects Table */}
            <ProjectsTable darkMode={darkMode} />
        </div>
    );
};