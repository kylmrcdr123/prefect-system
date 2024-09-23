import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// Justine
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import ForgotPassword from "./pages/ForgotPassword";
import CreateAccount from "./pages/CreateAccount";
import TicketTableAdmin from "./pages/TicketTableAdmin"; // Import your TicketTableAdmin component

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/account/create" element={<CreateAccount />} />
              <Route path="/account/forgot-password" element={<ForgotPassword />} />
              <Route path="/account/otp" element={<OTP />} />
              <Route path="/admin/tickets" element={<TicketTableAdmin />} /> {/* Add this route */}
              
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Router>
  );
};

export default App;
