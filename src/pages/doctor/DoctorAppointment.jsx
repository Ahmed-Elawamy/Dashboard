import React, { useState } from "react";

const initialAppointments = [
    {
        id: 1,
        patient: "Taha Mohamed",
        age: 25,
        date: "2025-06-10",
        time: "10:30 AM",
        fees: "$100",
        status: "Confirmed",
    },
    {
        id: 2,
        patient: "Ahmed Ibrahim",
        age: 20,
        date: "2025-06-11",
        time: "11:00 AM",
        fees: "$50",
        status: "Pending",
    },
];

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState(initialAppointments);

    const handleCancel = (id) => {
        const updatedList = appointments.map((item) =>
            item.id === id ? { ...item, status: "Cancelled" } : item
        );
        setAppointments(updatedList);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed":
                return "text-green-600";
            case "Pending":
                return "text-yellow-500";
            case "Cancelled":
                return "text-red-500";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="mt-10 p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">
                    My Appointments
                </h2>
            </div>

            <div className="overflow-x-auto shadow rounded-xl bg-white">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-5 py-3 text-left">#</th>
                            <th className="px-5 py-3 text-left">Patient</th>
                            <th className="px-5 py-3 text-left">Age</th>
                            <th className="px-5 py-3 text-left">Date & Time</th>
                            <th className="px-5 py-3 text-left">Fees</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No Appointments Found
                                </td>
                            </tr>
                        ) : (
                            appointments.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50 text-sm"
                                >
                                    <td className="px-5 py-3">{index + 1}</td>
                                    <td className="px-5 py-3">
                                        {item.patient}
                                    </td>
                                    <td className="px-5 py-3">{item.age}</td>
                                    <td className="px-5 py-3">
                                        <div>{item.date}</div>
                                        <div className="text-xs text-gray-500">
                                            {item.time}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">{item.fees}</td>
                                    <td
                                        className={`px-5 py-3 font-medium ${getStatusColor(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </td>
                                    <td className="px-5 py-3">
                                        {item.status !== "Cancelled" ? (
                                            <button
                                                onClick={() =>
                                                    handleCancel(item.id)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition"
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                No Action
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorAppointments;
