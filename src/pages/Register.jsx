import { useEffect, useState } from "react";
import { api } from "../testUtils/fetchApi";
import Robo from "../spinners/robo";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";

export const Register = () => {
    const [apiData, setApiData] = useState(null);
    const [errors, setErrors] = useState({});
    // const [loading, setLoading] = useState(false);
    const { loading, error } = useSelector((state) => state.auth);
 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "", 
        phone: "",
        role: "student",
        qualification: "",
        technologies: [],
        password: "",
    });

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be exactly 10 digits";
        if (!formData.role) newErrors.role = "Role is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // ✅ Only this part is changed to use Redux Toolkit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        dispatch(registerUser(formData))
            .unwrap()
            .then((res) => {
                console.log("Registration successful:", res);
                navigate("/");
            })
            .catch((err) => {
                setErrors((prev) => ({ ...prev, api: err }));
            });
    };

    return (
        <>
            {loading && <Robo />}
            <div className="min-h-screen flex">
                <div className="w-1/2 bg-purple-600 text-white flex flex-col justify-center items-center p-10">
                    <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
                    <p className="text-lg text-center max-w-md">
                        Join us and explore amazing features. Register now and get started!
                    </p>
                </div>
                <div className="w-1/2 flex items-center justify-center p-10 bg-white">
                    <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Register</h2>

                        {/* Full Name */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="10-digit number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <NavLink to={"/"} className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">
                                Login
                            </NavLink>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                        {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};
