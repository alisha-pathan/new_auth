import React from 'react';

export const ActivityFeed = ({ darkMode }) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activity</h2>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-start space-x-3">
            <div className={`h-10 w-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-indigo-100'} flex items-center justify-center mt-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project {item} updated</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
      <button className={`mt-4 text-sm font-medium ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}>
        View all activity
      </button>
    </div>
  );
};