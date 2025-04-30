import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Utility function to fetch service data
const fetchServiceData = async (serviceId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/services/${serviceId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching service data:", error);
    throw error;
  }
};

// Utility function to handle form changes
const handleInputChange = (form, setForm, event) => {
  const { name, value } = event.target;
  setForm({
    ...form,
    [name]: value,
  });
};

// Utility function to prepare form data for submission
const prepareFormData = (form) => ({
  tanggal: form.tanggal,
  deskripsi: form.deskripsi,
  biaya: Number(form.biaya),
});

const EditServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tanggal: "",
    deskripsi: "",
    biaya: "",
  });

  useEffect(() => {
    const getServiceData = async () => {
      const serviceData = await fetchServiceData(serviceId);
      setForm({
        tanggal: serviceData.tanggal?.split("T")[0],
        deskripsi: serviceData.deskripsi,
        biaya: serviceData.biaya,
      });
    };

    getServiceData();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = prepareFormData(form);

    try {
      await axios.put(`http://localhost:3000/api/v1/services/${serviceId}`, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Service</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <InputField name="tanggal" type="date" value={form.tanggal} onChange={(e) => handleInputChange(form, setForm, e)} required />
        <InputField name="deskripsi" type="text" value={form.deskripsi} onChange={(e) => handleInputChange(form, setForm, e)} required />
        <InputField name="biaya" type="number" value={form.biaya} onChange={(e) => handleInputChange(form, setForm, e)} required />

        <div className="flex gap-2">
          <Button type="submit" className="bg-yellow-500 text-white">Update</Button>
          <Button type="button" onClick={() => navigate(-1)} className="bg-gray-300">Kembali</Button>
        </div>
      </form>
    </div>
  );
};

// Reusable InputField component for form inputs
const InputField = ({ name, type, value, onChange, required }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    required={required}
    className="border p-2 rounded"
  />
);

// Reusable Button component for buttons
const Button = ({ type, onClick, className, children }) => (
  <button type={type} onClick={onClick} className={`px-4 py-2 rounded ${className}`}>
    {children}
  </button>
);

export default EditServicePage;
