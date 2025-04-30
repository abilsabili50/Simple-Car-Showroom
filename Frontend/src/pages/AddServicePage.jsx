import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddServicePage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tanggal: "",
    deskripsi: "",
    biaya: "",
  });

  // Handle form field changes
  const handleChange = ({ target: { name, value } }) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/services", {
        ...form,
        carId,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to add service", error);
    }
  };

  // Render the form fields
  const renderInput = (name, type, placeholder = "") => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={form[name]}
      onChange={handleChange}
      required
      className="border p-2 rounded"
    />
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Service</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {renderInput("tanggal", "date")}
        {renderInput("deskripsi", "text", "Deskripsi")}
        {renderInput("biaya", "number", "Biaya")}
        <div className="flex gap-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServicePage;
