import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Robo from "../spinners/robo";
import { loginUser } from "../features/auth/authSlice";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [token, navigate]);

    const validate = () => {
        const errors = {};
        if (!email.trim()) errors.email = "Email is required";
        if (!password.trim()) errors.password = "Password is required";
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => {
                navigate("/dashboard");
            })
            .catch((err) => {
                console.error("Login failed:", err);
            });
    };

    return (
        <>
            {loading && <Robo />}
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
                <div className="w-full max-w-md">

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-yellow-400 mb-2">
                                Your<span className="text-yellow-400 dark:text-yellow-400">App</span>
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">Sign in to your dashboard</p>
                        </div>
                        {error && (
                            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setFormErrors((prev) => ({ ...prev, email: "" }));
                                }}
                                className="w-full px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                            {formErrors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setFormErrors((prev) => ({ ...prev, password: "" }));
                                }}
                                className="w-full px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                            {formErrors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : "Sign In"}
                        </button>
                    </form>

                    <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <NavLink
                            to="/register"
                            className="text-yellow-500 dark:text-yellow-400 hover:underline font-medium"
                        >
                            Create account
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};