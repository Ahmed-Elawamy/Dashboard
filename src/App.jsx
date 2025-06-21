// // eslint-disable-next-line no-unused-vars
// import React, { useContext } from "react";
// import { AdminContext } from "./Context/AdminContext";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { Route, Routes } from "react-router-dom";
// import { DoctorContext } from "./Context/DoctorContext";
// import Dashboard from "./pages/admin/Dashboard";
// // import AllAppointments from "./pages/admin/AllAppointments";
// import AllAppointments from "./pages/admin/AllApointments";
// import AddDoctor from "./pages/admin/AddDoctor";
// import DoctorsList from "./pages/admin/DoctorList";
// import DoctorDashboard from "./pages/doctor/DoctorDashboard";
// import DoctorAppointments from "./pages/doctor/DoctorAppointment";
// import DoctorProfile from "./pages/doctor/DoctorProfile";
// import Login from "./pages/admin/Login";

// const App = () => {
//     return (
//         <div className="bg-[#F8F9FD]">
//             <Navbar />
//             <div className="flex items-start pt-5">
//                 <Sidebar />
//                 <div className="pt-5 w-full">
//                     <Routes>
//                         <Route path="/" element={<Dashboard />} />

//                         <Route
//                             path="/admin-dashboard"
//                             element={<Dashboard />}
//                         />
//                         <Route
//                             path="/all-appointments"
//                             element={<AllAppointments />}
//                         />
//                         <Route
//                             path="/all-appointment"
//                             element={<AllAppointments />}
//                         />
//                         <Route path="/add-doctor" element={<AddDoctor />} />
//                         <Route path="/doctor-list" element={<DoctorsList />} />
//                         <Route path="/login" element={<Login />} />

//                         <Route
//                             path="/doctor-dashboard"
//                             element={<DoctorDashboard />}
//                         />
//                         <Route
//                             path="/doctor-appointments"
//                             element={<DoctorAppointments />}
//                         />
//                         <Route
//                             path="/doctor-profile"
//                             element={<DoctorProfile />}
//                         />
//                     </Routes>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default App;
// ================= // =================
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout مشترك بين كل صفحات admin
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// صفحات Admin
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllApointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorList";
import Login from "./pages/admin/Login";

// صفحات Doctor
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointment";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import Consultations from "./pages/doctor/Consultations ";
import BookingSlots from "./pages/doctor/BookingSlots";

// Layout Wrapper
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
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
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="all-appointments" element={<AllAppointments />} />
                <Route path="add-doctor" element={<AddDoctor />} />
                <Route path="doctor-list" element={<DoctorsList />} />
                <Route path="login" element={<Login />} />
            </Route>

            {/* Doctor Routes */}
            <Route path="/doctor" element={<DoctorLayout />}>
                <Route index element={<DoctorDashboard />} />
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="consultations" element={<Consultations />} />
                <Route path="profile" element={<DoctorProfile />} />
                <Route path="slots" element={<BookingSlots />} />{" "}
            </Route>
        </Routes>
    );
};

export default App;
