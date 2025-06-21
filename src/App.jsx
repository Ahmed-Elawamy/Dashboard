import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";

import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorList";
import Login from "./pages/admin/Login";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointment";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import Consultations from "./pages/doctor/Consultations";
import BookingSlots from "./pages/doctor/BookingSlots";

const AdminLayout = () => (
    <div className="bg-[#F8F9FD]">
        <Navbar />
        <div className="flex items-start pt-5">
            <Sidebar userType="admin" />
            <div className="pt-5 w-full">
                <Outlet />
            </div>
        </div>
    </div>
);

const DoctorLayout = () => (
    <div className="bg-[#F8F9FD]">
        <Navbar />
        <div className="flex items-start pt-5">
            <Sidebar userType="doctor" />
            <div className="pt-5 w-full">
                <Outlet />
            </div>
        </div>
    </div>
);

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="all-appointments" element={<AllAppointments />} />
                <Route path="add-doctor" element={<AddDoctor />} />
                <Route path="doctor-list" element={<DoctorsList />} />
                <Route path="login" element={<Login />} />
            </Route>

            <Route path="/doctor" element={<DoctorLayout />}>
                <Route index element={<DoctorDashboard />} />
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="consultations" element={<Consultations />} />
                <Route path="profile" element={<DoctorProfile />} />
                <Route path="slots" element={<BookingSlots />} />
            </Route>
        </Routes>
    );
};

export default App;
