import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import App from "./App";
import Dashboard from "./portal/Dashboard";
import Invoices from "./portal/Invoices";
import Payouts from "./portal/Payouts";
import Settings from "./portal/Settings";
import Onboarding from "./portal/Onboarding";

const Nav = () => (
  <nav style={{display:"flex", gap:"16px", padding:"12px", borderBottom:"1px solid #eee"}}>
    <Link to="/portal">Dashboard</Link>
    <Link to="/portal/invoices">Invoices</Link>
    <Link to="/portal/payouts">Payouts</Link>
    <Link to="/portal/settings">Settings</Link>
    <Link to="/">POS</Link>
  </nav>
);

const Root = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/portal" element={<Dashboard />} />
      <Route path="/portal/invoices" element={<Invoices />} />
      <Route path="/portal/payouts" element={<Payouts />} />
      <Route path="/portal/settings" element={<Settings />} />
      <Route path="/portal/onboarding" element={<Onboarding />} />
      <Route path="*" element={<Navigate to="/portal" replace />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<Root />);


const Nav = () => (
  <nav style={{display:"flex", gap:"16px", padding:"12px", borderBottom:"1px solid #eee"}}>
    <Link to="/portal">Dashboard</Link>
    <Link to="/portal/invoices">Invoices</Link>
    <Link to="/portal/payouts">Payouts</Link>
    <Link to="/portal/settings">Settings</Link>
    <Link to="/">POS</Link>
  </nav>
);

const Root = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/portal" element={<Dashboard />} />
      <Route path="/portal/invoices" element={<Invoices />} />
      <Route path="/portal/payouts" element={<Payouts />} />
      <Route path="/portal/settings" element={<Settings />} />
      <Route path="/portal/onboarding" element={<Onboarding />} />
      <Route path="*" element={<Navigate to="/portal" replace />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<Root />);


const Nav = () => (
  <nav style={{display:"flex", gap:"16px", padding:"12px", borderBottom:"1px solid #eee"}}>
    <Link to="/portal">Dashboard</Link>
    <Link to="/portal/invoices">Invoices</Link>
    <Link to="/portal/payouts">Payouts</Link>
    <Link to="/portal/settings">Settings</Link>
    <Link to="/">POS</Link>
  </nav>
);

const Root = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/portal" element={<Dashboard />} />
      <Route path="/portal/invoices" element={<Invoices />} />
      <Route path="/portal/payouts" element={<Payouts />} />
      <Route path="/portal/settings" element={<Settings />} />
      <Route path="/portal/onboarding" element={<Onboarding />} />
      <Route path="*" element={<Navigate to="/portal" replace />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<Root />);

