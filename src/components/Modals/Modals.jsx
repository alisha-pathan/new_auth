import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ModalRole = ({
    isModalOpen,
    currentRole,
    setCurrentRole,
    handleSubmit,
    closeModal,
    formRef,
    handleKeyDown
}) => {
    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
                    onClick={closeModal}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf24 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, #fbbf24 0%, transparent 50%)`
                        }}></div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        className="w-full max-w-lg relative"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={handleKeyDown}
                    >
                        {/* Modal Container */}
                        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 rounded-3xl"></div>

                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-6">
                                {/* Header Background Pattern */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`
                                    }}></div>
                                </div>

                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-black"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-black">
                                                {currentRole.id ? 'Edit Role' : 'Create New Role'}
                                            </h2>
                                            <p className="text-black/70 text-sm font-medium">
                                                {currentRole.id ? 'Update role details and permissions' : 'Define a new role with specific permissions'}
                                            </p>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={closeModal}
                                        className="w-10 h-10 bg-black/20 hover:bg-black/30 rounded-xl flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                    >
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="relative p-8 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm">
                                <form
                                    ref={formRef}
                                    id="role-form"
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    {/* Role Name Field */}
                                    <div className="space-y-3">
                                        <label className=" text-sm font-bold text-gray-200 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                            Role Name
                                            <span className="text-red-400 text-lg">*</span>
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-5 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/70 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 group-hover:border-gray-500/70"
                                                value={currentRole.name}
                                                onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                                                placeholder="e.g. 'Senior Project Manager'"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Description Field */}
                                    <div className="space-y-3">
                                        <label className=" text-sm font-bold text-gray-200 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                            Description
                                            <span className="text-red-400 text-lg">*</span>
                                        </label>
                                        <div className="relative group">
                                            <textarea
                                                required
                                                rows="4"
                                                className="w-full px-5 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/70 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none group-hover:border-gray-500/70"
                                                value={currentRole.description}
                                                onChange={(e) => setCurrentRole({ ...currentRole, description: e.target.value })}
                                                placeholder="Describe the role's responsibilities, key duties, and scope of work..."
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Character Counter */}
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400">
                                            {currentRole.description?.length || 0} characters
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-6 border-t border-gray-700/50 flex gap-4">
                                        <motion.button
                                            type="button"
                                            whileHover={{
                                                scale: 1.02,
                                                backgroundColor: "rgba(55, 65, 81, 0.8)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={closeModal}
                                            className="flex-1 px-6 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl hover:bg-gray-600/50 transition-all duration-200 font-semibold text-gray-300 hover:text-white backdrop-blur-sm"
                                        >
                                            Cancel
                                        </motion.button>

                                        <motion.button
                                            type="submit"
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: "0 10px 40px rgba(251, 191, 36, 0.3)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden group"
                                        >
                                            {/* Button Shine Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {currentRole.id ? (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Save Changes
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        Create Role
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>
                                    </div>
                                </form>

                                {/* Form Tips */}
                                <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 text-yellow-400 mt-0.5">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-yellow-400 mb-1">Pro Tips</h4>
                                            <ul className="text-xs text-gray-300 space-y-1">
                                                <li>• Use clear, descriptive names for better organization</li>
                                                <li>• Include key responsibilities in the description</li>
                                                <li>• Consider the role's scope and authority level</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


