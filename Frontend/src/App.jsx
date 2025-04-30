import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddServicePage from "./pages/AddServicePage";
import CarDetailPage from "./pages/CarDetailPage";
import CarFormPage from "./pages/CarFormPage";
import EditServicePage from "./pages/EditServicePage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-car" element={<CarFormPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/services/add/:carId" element={<AddServicePage />} />
        <Route path="/services/edit/:serviceId" element={<EditServicePage />} />
      </Routes>
    </Router>
  );
}
