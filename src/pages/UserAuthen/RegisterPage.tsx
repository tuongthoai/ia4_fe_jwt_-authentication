import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../Common/NavBar";
import {register as registerUser } from "../../services/AuthService.tsx";

type RegisterFormInputs = {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    lastname: string;
    address: string;
};

const RegisterPage: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const password = watch("password", "");
    const token = localStorage.getItem("token");

    const onSubmit = async (data: RegisterFormInputs) => {
        const { confirmPassword, ...userData } = data; // Exclude confirmPassword as it’s not needed by the backend

        try {
            await registerUser(userData);
            console.log("Registration successful");
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error: any) {
            console.error("Error during registration", error);
            setErrorMessage(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <>
            <NavBar loggedIn={!!token} />
            <div className="max-w-md mx-auto mt-10 p-8 border rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                {errorMessage && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {errorMessage}
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            className="w-full px-3 py-2 border rounded"
                            autoComplete="new-username"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full px-3 py-2 border rounded"
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            className="w-full px-3 py-2 border rounded"
                            autoComplete="new-password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* First Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "First name is required" })}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Last Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            {...register("lastname", { required: "Last name is required" })}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.lastname && (
                            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                        )}
                    </div>

                    {/* Address Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700">Address</label>
                        <textarea
                            {...register("address", { required: "Address is required" })}
                            className="w-full px-3 py-2 border rounded"
                        ></textarea>
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
