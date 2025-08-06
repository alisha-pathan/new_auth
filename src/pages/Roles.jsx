import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'CEO', description: 'Chief Executive Officer', users: 1 },
    { id: 2, name: 'CTO', description: 'Chief Technology Officer', users: 3 },
    { id: 3, name: 'Manager', description: 'Department Manager', users: 12 },
    { id: 4, name: 'Team Lead', description: 'Project Team Lead', users: 8 },
    { id: 5, name: 'Developer', description: 'Software Developer', users: 45 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ id: null, name: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(null);
  const formRef = useRef(null);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentRole.name.trim() || !currentRole.description.trim()) return;

    if (currentRole.id) {
      setRoles(roles.map(role =>
        role.id === currentRole.id ? currentRole : role
      ));
    } else {
      setRoles([...roles, {
        ...currentRole,
        id: Math.max(...roles.map(r => r.id)) + 1,
        users: 0
      }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setIsDeleting(id);
    setTimeout(() => {
      setRoles(roles.filter(role => role.id !== id));
      setIsDeleting(null);
    }, 300);
  };

  const openAddModal = () => {
    setCurrentRole({ id: null, name: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (role) => {
    setCurrentRole({ ...role });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && formRef.current) {
      const form = formRef.current;
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.click();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const firstInput = document.querySelector('#role-form input');
      if (firstInput) firstInput.focus();
    }
  }, [isModalOpen]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-yellow-400">
              Role Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Manage organizational roles and permissions
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={openAddModal}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Role
          </motion.button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 relative"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search roles by name or description..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Roles Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden py-3"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRoles.length > 0 ? (
                  <AnimatePresence>
                    {filteredRoles.map((role) => (
                      <motion.tr
                        key={role.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isDeleting === role.id ? 'opacity-0 scale-95 transition-all duration-300' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          <NavLink
                            to={`/roles/${role.id}`}
                            className="text-yellow-600 dark:text-yellow-400 hover:underline flex items-center gap-2"
                          >

                            {role.name}
                          </NavLink>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {role.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${role.users > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                            {role.users} {role.users === 1 ? 'user' : 'users'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-5">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openEditModal(role)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                              <span className="sr-only">Edit</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(role.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <span className="sr-only">Delete</span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg">No roles found</p>
                        {searchTerm && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSearchTerm('')}
                            className="mt-2 text-sm text-yellow-600 hover:text-yellow-700 dark:hover:text-yellow-500 transition-colors"
                          >
                            Clear search
                          </motion.button>
                        )}
                      </motion.div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Premium Stats Footer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 transition-transform hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 group-hover:rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Roles</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{roles.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 transition-transform hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 group-hover:rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {roles.reduce((sum, role) => sum + role.users, 0)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 transition-transform hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 group-hover:rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Users/Role</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {roles.length > 0 ?
                    (roles.reduce((sum, role) => sum + role.users, 0) / roles.length).toFixed(1) :
                    '0.0'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Premium Modal */}
        {/* <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600"
                onKeyDown={handleKeyDown}
              >

                <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 px-6 py-5 rounded-t-xl">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-amber-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {currentRole.id ? 'Edit Role' : 'Create New Role'}
                  </h2>
                </div>

                {/* Modal Body */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-b-xl">
                  <form
                    ref={formRef}
                    id="role-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Role Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
                        value={currentRole.name}
                        onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                        placeholder="e.g. 'Project Manager'"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                        value={currentRole.description}
                        onChange={(e) => setCurrentRole({ ...currentRole, description: e.target.value })}
                        placeholder="Describe the role's responsibilities..."
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={closeModal}
                        className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{
                          scale: 1.03,
                          background: "linear-gradient(to right, #f59e0b, #d97706)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg shadow-md transition-all hover:shadow-lg"
                      >
                        {currentRole.id ? 'Save Changes' : 'Create Role'}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
};