import React from 'react';

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  bgColor, 
  textColor, 
  darkMode 
}) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="flex justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{value}</p>
          <p className={`${textColor} text-xs mt-2`}>{change} from last month</p>
        </div>
        <div className={`h-12 w-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};