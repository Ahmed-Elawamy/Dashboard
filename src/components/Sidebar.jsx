import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaCalendarAlt, FaComments, FaUser, FaClock } from "react-icons/fa";

const Sidebar = ({ userType }) => {
    const basePath = userType === "admin" ? "/admin" : "/doctor";

    // تنسيق الروابط حسب الحالة النشطة
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-r-lg border-l-4 ${
            isActive
                ? "bg-gray-100 font-semibold text-black border-blue-500"
                : "text-[#515151] hover:bg-gray-50 border-transparent"
        }`;

    const iconClass = "w-5 h-5";

    return (
        <div className="min-h-screen bg-white border-r border-gray-100 w-1/5 py-5 mt-10">
            <ul className="space-y-1 w-full">
                {/* Dashboard */}
                <NavLink to={`${basePath}/dashboard`} className={linkClass}>
                    <img
                        src={assets.home_icon}
                        className={iconClass}
                        alt="Dashboard"
                    />
                    <p className="hidden md:inline text-base">Dashboard</p>
                </NavLink>

                {userType === "admin" && (
                    <>
                        <NavLink
                            to={`${basePath}/all-appointments`}
                            className={linkClass}
                        >
                            <img
                                src={assets.appointment_icon}
                                className={iconClass}
                                alt="Appointments"
                            />
                            <p className="hidden md:inline text-base">
                                Appointments
                            </p>
                        </NavLink>

                        <NavLink
                            to={`${basePath}/add-doctor`}
                            className={linkClass}
                        >
                            <img
                                src={assets.add_icon}
                                className={iconClass}
                                alt="Add Doctor"
                            />
                            <p className="hidden md:inline text-base">
                                Add Doctor
                            </p>
                        </NavLink>

                        <NavLink
                            to={`${basePath}/doctor-list`}
                            className={linkClass}
                        >
                            <img
                                src={assets.people_icon}
                                className={iconClass}
                                alt="Doctors List"
                            />
                            <p className="hidden md:inline text-base">
                                Doctors List
                            </p>
                        </NavLink>
                    </>
                )}

                {userType === "doctor" && (
                    <>
                        <NavLink
                            to={`${basePath}/appointments`}
                            className={linkClass}
                        >
                            <FaCalendarAlt className={iconClass} />
                            <p className="hidden md:inline text-base">
                                Appointments
                            </p>
                        </NavLink>

                        <NavLink
                            to={`${basePath}/consultations`}
                            className={linkClass}
                        >
                            <FaComments className={iconClass} />
                            <p className="hidden md:inline text-base">
                                Consultations
                            </p>
                        </NavLink>

                        <NavLink
                            to={`${basePath}/profile`}
                            className={linkClass}
                        >
                            <FaUser className={iconClass} />
                            <p className="hidden md:inline text-base">
                                Profile
                            </p>
                        </NavLink>

                        <NavLink to={`${basePath}/slots`} className={linkClass}>
                            <FaClock className={iconClass} />
                            <p className="hidden md:inline text-base">
                                Booking Slots
                            </p>
                        </NavLink>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
