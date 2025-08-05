import React from 'react';

export const ProjectsTable = ({ darkMode }) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Projects</h2>
        <button className={`text-sm px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
          Add Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {['Project', 'Status', 'Team', 'Progress', 'Action'].map((header) => (
                <th 
                  key={header} 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>{header}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project {item}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Due in {item * 3} days</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {item % 2 === 0 ? 'On track' : 'At risk'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].slice(0, item).map((avatar) => (
                      <div 
                        key={avatar} 
                        className={`h-8 w-8 rounded-full border-2 ${darkMode ? 'border-gray-800' : 'border-white'} flex items-center justify-center text-xs font-medium ${darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}
                      >
                        {`U${avatar}`}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-2 rounded-full ${item % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${item * 30}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item * 30}% complete</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className={`${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'} mr-3`}>Edit</button>
                  <button className={darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};