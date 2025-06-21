import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorProfile = () => {
    const [form, setForm] = useState({
        name: "Dr. Emily Larson",
        qualification: "MBBS - Gynecologist",
        experience: "3 Years",
        about: "Dr. Emily has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fee: 60,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // send to backend here in future
        toast.success("Profile updated successfully!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Qualification
                    </label>
                    <input
                        type="text"
                        name="qualification"
                        value={form.qualification}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Experience
                    </label>
                    <input
                        type="text"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        About
                    </label>
                    <textarea
                        name="about"
                        rows={4}
                        value={form.about}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded mt-1"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Appointment Fee ($)
                    </label>
                    <input
                        type="number"
                        name="fee"
                        value={form.fee}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded mt-1"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    Save Changes
                </button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default DoctorProfile;
