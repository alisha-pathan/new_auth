import React from 'react';
import { LeftSide, RightSide } from '../components';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 p-4 pt-8">
                <LeftSide />
            </div>
            <div className="flex-1 bg-gray-100 p-8">
                <RightSide />
            </div>
        </div>
    );
};

export default Dashboard;