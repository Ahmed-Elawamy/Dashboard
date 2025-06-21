import React, { useState } from "react";

const initialConsultations = [
    {
        id: 1,
        patient: "Taha Mohamed",
        method: "Video",
        date: "2025-06-20",
        time: "02:00 PM",
        status: "Pending",
    },
    {
        id: 2,
        patient: "Ahmed Youssef",
        method: "Chat",
        date: "2025-06-18",
        time: "11:00 AM",
        status: "Completed",
    },
];

const DoctorConsultations = () => {
    const [consultations, setConsultations] = useState(initialConsultations);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-500";
            case "Completed":
                return "text-green-600";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="mt-10 p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">
                    Consultations
                </h2>
            </div>

            <div className="overflow-x-auto shadow rounded-xl bg-white">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-5 py-3 text-left">#</th>
                            <th className="px-5 py-3 text-left">Patient</th>
                            <th className="px-5 py-3 text-left">Method</th>
                            <th className="px-5 py-3 text-left">Date & Time</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultations.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No Consultations Found
                                </td>
                            </tr>
                        ) : (
                            consultations.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50 text-sm"
                                >
                                    <td className="px-5 py-3">{index + 1}</td>
                                    <td className="px-5 py-3">
                                        {item.patient}
                                    </td>
                                    <td className="px-5 py-3">{item.method}</td>
                                    <td className="px-5 py-3">
                                        <div>{item.date}</div>
                                        <div className="text-xs text-gray-500">
                                            {item.time}
                                        </div>
                                    </td>
                                    <td
                                        className={`px-5 py-3 font-medium ${getStatusStyle(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </td>
                                    <td className="px-5 py-3">
                                        <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition">
                                            {item.status === "Pending"
                                                ? "Start"
                                                : "View"}
                                        </button>
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

export default DoctorConsultations;
