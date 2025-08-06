import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

export const RevenueChart = ({ darkMode }) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} lg:col-span-2`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Revenue Overview</h2>
        <select className={`text-sm rounded-md px-3 py-1 focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4b5563' : '#e5e7eb'} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} 
              stroke={darkMode ? '#6b7280' : '#d1d5db'} 
            />
            <YAxis 
              tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} 
              stroke={darkMode ? '#6b7280' : '#d1d5db'} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                borderColor: darkMode ? '#374151' : '#e5e7eb',
                borderRadius: '0.5rem',
                color: darkMode ? '#f3f4f6' : '#111827'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke="#82ca9d" 
              fillOpacity={1} 
              fill="url(#colorUsers)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};