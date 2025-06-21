// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center space-y-6">
                <h1 className="text-2xl font-bold">
                    Welcome to CLini Dashboard
                </h1>
                <p className="text-gray-600">Please choose your dashboard</p>

                <div className="flex justify-center gap-6 mt-4">
                    <button
                        onClick={() => navigate("/admin")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer"
                    >
                        Admin Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/doctor")}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl cursor-pointer"
                    >
                        Doctor Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
