// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import App from "./App"; // your POS app
import Dashboard from "./portal/Dashboard";
import Invoices from "./portal/Invoices";
import Payouts from "./portal/Payouts";
import Settings from "./portal/Settings";
import Onboarding from "./portal/Onboarding";
import Login from "./Login";
import { isAuthed, logout } from "./auth";

const Nav = () => (
  <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee", fontFamily: "sans-serif" }}>
    <Link to="/portal">Dashboard</Link>
    <Link to="/portal/invoices">Invoices</Link>
    <Link to="/portal/payouts">Payouts</Link>
    <Link to="/portal/settings">Settings</Link>
    <Link to="/" style={{ marginLeft: "auto" }}>POS</Link>
    {isAuthed() ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
  </nav>
);

const Protected = ({ children }) => (isAuthed() ? children : <Navigate to="/login" replace />);

const Root = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
      <Route path="/portal" element={<Protected><Dashboard /></Protected>} />
      <Route path="/portal/invoices" element={<Protected><Invoices /></Protected>} />
      <Route path="/portal/payouts" element={<Protected><Payouts /></Protected>} />
      <Route path="/portal/settings" element={<Protected><Settings /></Protected>} />
      <Route path="/portal/onboarding" element={<Protected><Onboarding /></Protected>} />
      <Route path="*" element={<Navigate to="/portal" replace />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<Root />);


