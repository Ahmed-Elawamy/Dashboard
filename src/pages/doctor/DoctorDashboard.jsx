import React from "react";

const DoctorDashboard = () => {
    const stats = {
        todayAppointments: 4,
        pendingConsultations: 2,
        totalEarnings: "$400",
        patientsSeen: 18,
    };

    const recentAppointments = [
        {
            patient: "Ahmed Youssef",
            date: "2025-06-19",
            time: "03:00 PM",
            status: "Confirmed",
        },
        {
            patient: "Nour Adel",
            date: "2025-06-19",
            time: "05:30 PM",
            status: "Pending",
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
                Doctor Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Today's Appointments
                    </h2>
                    <p className="text-2xl font-bold text-blue-600">
                        {stats.todayAppointments}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Pending Consultations
                    </h2>
                    <p className="text-2xl font-bold text-yellow-600">
                        {stats.pendingConsultations}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">Total Earnings</h2>
                    <p className="text-2xl font-bold text-green-600">
                        {stats.totalEarnings}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">Patients Seen</h2>
                    <p className="text-2xl font-bold text-purple-600">
                        {stats.patientsSeen}
                    </p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">
                    Recent Appointments
                </h2>
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-2">Patient</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Time</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentAppointments.map((appt, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-2">{appt.patient}</td>
                                <td className="p-2">{appt.date}</td>
                                <td className="p-2">{appt.time}</td>
                                <td
                                    className={`p-2 font-semibold ${
                                        appt.status === "Confirmed"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                    }`}
                                >
                                    {appt.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorDashboard;
