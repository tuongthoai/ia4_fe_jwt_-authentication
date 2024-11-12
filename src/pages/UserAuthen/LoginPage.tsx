import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../Common/NavBar";
import {login} from "../../services/AuthService.tsx";

type LoginFormInputs = {
    username: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data);
            navigate("/"); // Redirect to profile page after successful login
        } catch (error) {
            setErrorMessage("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        }
    };

    return (
        <>
            <NavBar loggedIn={!!localStorage.getItem("token")} />
            <div className="max-w-md mx-auto mt-10 p-8 border rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            {...formRegister("username", { required: "Username is required" })}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...formRegister("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                            className="w-full px-3 py-2 border rounded"
                            autoComplete="new-password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
