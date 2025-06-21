import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const initialSlots = {
    SAT: ["10:30 PM", "12:00 PM", "03:00 PM"],
    SUN: ["11:00 AM", "01:00 PM"],
    MON: ["12:30 PM", "04:00 PM"],
    TUE: [],
    WED: ["10:30 AM"],
    THU: ["11:30 AM", "01:30 PM"],
    FRI: ["02:00 PM"],
};

const days = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

const DoctorBookingSlots = () => {
    const [slots, setSlots] = useState(initialSlots);
    const [newSlot, setNewSlot] = useState("");
    const [selectedDay, setSelectedDay] = useState("SAT");

    const handleAddSlot = () => {
        if (!newSlot) return;

        setSlots((prev) => ({
            ...prev,
            [selectedDay]: [...prev[selectedDay], newSlot],
        }));
        setNewSlot("");
    };

    const handleRemoveSlot = (day, index) => {
        setSlots((prev) => {
            const updatedDaySlots = [...prev[day]];
            updatedDaySlots.splice(index, 1);
            return {
                ...prev,
                [day]: updatedDaySlots,
            };
        });
    };

    return (
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Booking Slots</h1>

            {/* Add Slot */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="border rounded px-4 py-2 text-gray-700"
                >
                    {days.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    placeholder="PMثال: 10:30 AM"
                    className="border rounded px-4 py-2 w-full sm:w-auto"
                />

                <button
                    onClick={handleAddSlot}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Add Slot
                </button>
            </div>

            {/* List of Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {days.map((day) => (
                    <div key={day} className="bg-white rounded-xl shadow p-4">
                        <h2 className="font-semibold text-gray-800 mb-2">
                            {day}
                        </h2>
                        {slots[day].length === 0 ? (
                            <p className="text-sm text-gray-500">No slots</p>
                        ) : (
                            <ul className="space-y-2">
                                {slots[day].map((slot, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center border rounded px-3 py-1"
                                    >
                                        <span>{slot}</span>
                                        <button
                                            onClick={() =>
                                                handleRemoveSlot(day, index)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorBookingSlots;
