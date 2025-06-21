import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const initialAppointments = [
  {
    id: 1,
    patient: "taha mohamed",
    age: 25,
    date: "2025-06-10",
    time: "10:30 AM",
    doctor: "Dr. Ahmed",
    fees: "$100",
  },
  {
    id: 2,
    patient: "ahmed ibrahim",
    age: 20,
    date: "2025-06-11",
    time: "11:00 AM",
    doctor: "Dr. Tarek",
    fees: "$50",
  },
];

const AllAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleDelete = (id) => {
    const updatedList = appointments.filter((item) => item.id !== id);
    setAppointments(updatedList);
  };

  return (
    <div className="mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          All Appointments
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
              <th className="px-5 py-3 text-left">Doctor</th>
              <th className="px-5 py-3 text-left">Fees</th>
              <th className="px-5 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No Appointments Found
                </td>
              </tr>
            ) : (
              appointments.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 text-sm">
                  <td className="px-5 py-3">{index + 1}</td>
                  <td className="px-5 py-3">{item.patient}</td>
                  <td className="px-5 py-3">{item.age}</td>
                  <td className="px-5 py-3">
                    <span className="block">{item.date}</span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </td>
                  <td className="px-5 py-3">{item.doctor}</td>
                  <td className="px-5 py-3">{item.fees}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-full text-xs font-medium transition text-xl"
                    >
                      <FaXmark />
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

export default AllAppointments;