import React from "react";

const Dashboard = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">Doctors</h2>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">Patients</h2>
                    <p className="text-2xl font-bold text-green-600">45</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">Appointments</h2>
                    <p className="text-2xl font-bold text-yellow-600">20</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">Total Revenue</h2>
                    <p className="text-2xl font-bold text-purple-600">$3,500</p>
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
                            <th className="text-left p-2">Doctor</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-50">
                            <td className="p-2">Taha Mohamed</td>
                            <td className="p-2">Dr. Ahmed</td>
                            <td className="p-2">2025-06-15</td>
                            <td className="p-2 text-green-600 font-semibold">
                                Confirmed
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-2">Ahmed Youssef</td>
                            <td className="p-2">Dr. Tarek</td>
                            <td className="p-2">2025-06-14</td>
                            <td className="p-2 text-yellow-600 font-semibold">
                                Pending
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
