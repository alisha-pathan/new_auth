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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6"
                >
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-2">
                        Welcome Back 🐼
                    </h2>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
                        Please login to your account
                    </p>
                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-800 px-3 py-2 rounded">
                            {error}
                        </div>
                    )}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setFormErrors((prev) => ({ ...prev, email: "" }));
                            }}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                            placeholder="you@example.com"
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setFormErrors((prev) => ({ ...prev, password: "" }));
                            }}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                            placeholder="••••••••"
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-transform transform hover:scale-[1.01] active:scale-[0.98]"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                        Don’t have an account?{" "}
                        <NavLink
                            to="/register"
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                        >
                            Register
                        </NavLink>
                    </div>
                </form>
            </div>
        </>
    );
};